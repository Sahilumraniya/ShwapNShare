/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authenication = true }) {
  const navigate = useNavigate();
  console.log("Protected", children);
  const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authenication && authStatus !== authenication) {
      navigate("/login");
    } else if (!authenication && authStatus === authenication) {
      console.log("authStatus", authStatus);
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, navigate, authenication]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
}
