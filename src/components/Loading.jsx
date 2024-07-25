/* eslint-disable react/prop-types */
"use client";

// import React from "react";
import { Logo } from "../assets";

const Loading = ({ theme = "light" }) => {
  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.container, ...styles[theme] }}>
        <img
          alt="logo"
          width={200}
          height={200}
          src={Logo}
        />
        <img
          src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
          alt="Loading...."
        />
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  light: {
    backgroundColor: "#fff",
    color: "#000",
  },
  dark: {
    backgroundColor: "#333",
    color: "#fff",
  }
};

export default Loading;
