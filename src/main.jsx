import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import AllProduct from "./pages/AllProduct.jsx";
import PostProduct from "./pages/PostProduct.jsx";
import { AuthLayout } from "./components/index.js";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AboutUsPage } from "./pages/AboutUsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/add-product",
        element: (
          <AuthLayout authenication>
            <AddProduct />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-product/:id",
        element: (
          <AuthLayout authenication>
            <EditProduct />
          </AuthLayout>
        ),
      },
      {
        path: "/all-product",
        element: (
          <AuthLayout authenication>
            <AllProduct />
          </AuthLayout>
        ),
      },
      {
        path: "/product/:id",
        element: <PostProduct />,
      },
      {
        path: "/aboutUs",
        element: <AboutUsPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
