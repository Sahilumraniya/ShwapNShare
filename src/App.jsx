import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authserivce from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  console.log("App");

  useEffect(() => {
    authserivce
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log("App : " + userData);
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <>
      <Header />
      <div className="w-full bg-violet-300">
        <div className="w-full">
          <main className="w-full">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center">
        <img
          src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
          alt="Loading...."
        />
      </div>
    </>
  );
}

export default App;
