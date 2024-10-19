import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "../lib/util";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';
import restApp, { authCookieName, authenticationService, cookieStorage, googleService, userService } from "../api/rest.app";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authenticationService.create({
        email: data.email,
        password: data.password,
        strategy: "local"
      });

      localStorage.setItem(authCookieName, session.accessToken);
      cookieStorage.setItem(authCookieName, session.accessToken);
      const test = await restApp.reAuthenticate();
      console.log("test", test);

      if (session) {
        const userData = await userService.get(session.user._id);
        if (userData) {
          toast("Login successful", { type: "success" });
          dispatch(login({ userData }));
          navigate("/");
        }
      }
    } catch (e) {
      setError(e.message);
      toast(e.message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      console.log("credentialResponse", credentialResponse);
      const { credential } = credentialResponse;
      // const decodedToken = jwtDecode(token);

      // const user = {
      //   googleId: decodedToken.sub, // Google ID
      //   email: decodedToken.email,
      //   name: decodedToken.name,
      // };
      // console.log("user", user);
      const session = await authenticationService.create({
        strategy: 'google',
        payload: credential,
      });
      localStorage.setItem(authCookieName, session.accessToekn);
      cookieStorage.setItem(authCookieName, session.accessToekn);
      await restApp.reAuthenticate();

      const userData = await userService.get(session.user._id);
      if (userData) {
        toast("Login successful", { type: "success" });
        dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      toast(error.message, { type: "error" });
    }
  };


  return (
    <div className="max-w-md w-full mx-auto rounded-lg p-6 md:p-8 shadow-lg bg-white dark:bg-gray-800 transition duration-300">
      {loading && <Loading />}
      <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200">
        Welcome to SwapNShare
      </h2>
      <p className="text-gray-600 text-sm mt-2 dark:text-gray-400">
        Login to SwapNShare if you can because we don&apos;t have a login flow yet.
      </p>
      <form className="my-8" onSubmit={handleSubmit(handleLogin)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="example@domain.com" type="email" {...register("email", { required: true })} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" {...register("password", { required: true })} />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-8 h-[1px] w-full" />
        <div className="my-5">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              toast("Login Failed", { type: "error" });
            }}
            allowed_parent_origin={window.location.origin}
            auto_select={true}
            cancel_on_tap_outside={true}
            theme="dark"
            shape="pill"
            context="signup"
            itp_support={true}
            promptMomentNotification={true}
            text="Login with Google"
            ux_mode="popup"
          />
        </div>
        <div className="text-center text-gray-600 dark:text-gray-400">
          If you don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Login;
