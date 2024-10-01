import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { cookieStorage } from "../../api/rest.app";

const LogoutBtn = ({ theme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      // await authserivce.logout(); // Uncomment if you have a logout service
      // console.log("Logging out successful, showing toast");
      toast.success("Logged out successfully");
      localStorage.clear();
      cookieStorage.clear();
      dispatch(logout());
      setTimeout(() => {
        navigate("/");
        setLoading(false);
      }, 500); // Delay to allow toast to appear
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      {loading && <Loading />}
      <button
        onClick={handleLogout}
        className={`py-2 px-4 transition-colors duration-300 
                    ${theme ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                    font-bold rounded-md shadow-md transform hover:scale-105`}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
