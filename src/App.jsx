import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Loading } from "./components";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "./context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import restApp, { accessTokenService, authCookieName, cookieStorage } from "./api/rest.app.js";

function App() {
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const location = useLocation();
  const isRoomPage = location.pathname.startsWith('/room/');

  useEffect(() => {
    const token = localStorage.getItem(authCookieName) || cookieStorage.getItem(authCookieName);

    if (token) {
      accessTokenService.find({
        headers: {
          authorization: `Bearer ${token}`,
        }
      }).then(res => {
        if (res) {
          const userData = res.user;
          localStorage.setItem(authCookieName, res.accessToken);
          cookieStorage.setItem(authCookieName, res.accessToken);
          dispatch(login({ userData }));
          return restApp.reAuthenticate(); // Re-authenticate if needed
        } else {
          dispatch(logout());
        }
      }).catch(() => {
        dispatch(logout()); // Logout if there's an error
      }).finally(() => {
        setLoading(false); // Always set loading to false after attempts
      });
    } else {
      setLoading(false); // If no token, set loading to false
    }
  }, [dispatch]);

  if (loading) {
    return <Loading />; // Show loading indicator if loading
  }

  return (
    <div className={`${theme} transition-colors duration-300`}>
      {!isRoomPage && <Header />}
      <div className={`w-full ${theme ? 'bg-gray-900' : 'bg-gray-700'}`}>
        <ToastContainer position="bottom-left" theme={theme ? "dark" : "light"} />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
      {!isRoomPage && <Footer />}
    </div>
  );
}

export default App;
