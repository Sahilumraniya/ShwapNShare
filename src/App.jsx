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
          console.log(userData);
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
      <div className="w-full">
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
      <div>Loading..</div>
    </>
  );
}

export default App;
