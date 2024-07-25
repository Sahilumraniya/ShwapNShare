/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch } from "react-redux";
import authserivce from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

// eslint-disable-next-line react/prop-types
const LogoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await authserivce.logout().then(() => {
      dispatch(logout());
      navigate("/");
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      {loading && <Loading />}
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
