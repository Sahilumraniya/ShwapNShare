/* eslint-disable react/prop-types */
"use client";

import { Logo } from "../assets";
import { useTheme } from "../context/ThemeContext";

const Loading = () => {
  const { theme } = useTheme(); // Assuming 'theme' is a boolean

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.container, ...(theme ? styles.dark : styles.light) }}>
        <img
          alt="logo"
          width={200}
          height={200}
          src={Logo}
          style={styles.logo}
        />
      </div>
    </div>
  );
};

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
  },
  logo: {
    animation: "spin 2s linear infinite", // Spinning animation
  },
};

// Add keyframes for the spinning animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`, styleSheet.cssRules.length);

export default Loading;
