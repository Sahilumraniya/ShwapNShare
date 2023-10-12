import React from "react";
import { useDispatch } from "react-redux";
import authserivce from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    authserivce.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <div>
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
