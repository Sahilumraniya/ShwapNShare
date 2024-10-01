/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Loading } from "./components";
import { Outlet, Routes, useLocation } from "react-router-dom";
import { useTheme } from "./context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import restApp, { accessTokenService, authCookieName, cookieStorage } from "./api/rest.app.js";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const location = useLocation();
  const isRoomPage = location.pathname.startsWith('/room/');

  useEffect(() => {
    const token = localStorage.getItem(authCookieName) ?? cookieStorage.getItem(authCookieName);
    if (token && token !== '') {
      setLoading(true);
      accessTokenService.find({
        headers: {
          authorization: `Bearer ${token}`,
        }
      }).then(async (res) => {
        if (res) {
          // console.log("App : ", res.accessToken);
          const userData = res.user;
          localStorage.setItem(authCookieName, res.accessToken);
          cookieStorage.setItem(authCookieName, res.accessToken);
          dispatch(login({ userData }));
          await restApp.reAuthenticate();
        } else {
          dispatch(logout());
        }
      })
        .finally(() => {
          setLoading(false);
        });
    }

    // authserivce
    //   .getCurrentUser()
    //   .then((userData) => {
    //     if (userData) {
    //       console.log("App : " + userData);
    //       dispatch(login({ userData }));
    //     } else {
    //       dispatch(logout());
    //     }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [dispatch]);

  return !loading ? (
    <>
      <div className={`${theme} transition-colors duration-300`}>
        {!isRoomPage && <Header />}
        <div className={`w-ful ${theme ? 'bg-gray-900' : 'bg-gray-700'}`}>
          {theme ? <ToastContainer position="bottom-left" theme="dark" /> : <ToastContainer position="bottom-left" theme="light" />}
          <div className="w-full">
            <main className="w-full">
              <Outlet />
            </main>
          </div>
        </div>
        {!isRoomPage && <Footer />}
      </div>
    </>
  ) : (
    <>
      <Loading />
    </>
  );
}

export default App;
