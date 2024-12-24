import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.scss";
import { GlobalStyles } from "./styles/GlobalStyles.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import setupLocatorUI from "@locator/runtime";

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles></GlobalStyles>
    <BrowserRouter>
      <App />
      <ToastContainer></ToastContainer>
    </BrowserRouter>
  </React.StrictMode>
);
