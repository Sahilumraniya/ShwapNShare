/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authserivce from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice";
import { Footer, Loading } from "./components";
import { Outlet } from "react-router-dom";
import { FloatingNav } from "./components/ui/floating-navbar.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { theme } = useTheme();

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
  }, [dispatch]);

  return !loading ? (
    <>
      <div className={theme}>
        <FloatingNav />
        <div className="w-full bg-violet-300">
        <ToastContainer theme={theme} />
          <div className="w-full">
            <main className="w-full">
              <Outlet />
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </>
  ) : (
    <>
      <Loading />
    </>
  );
}

export default App;
