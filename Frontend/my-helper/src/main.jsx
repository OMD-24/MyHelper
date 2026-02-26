import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("SW registered:", reg.scope))
      .catch((err) => console.log("SW failed:", err));
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ top: 20 }}
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "16px",
              background: "#1C1917",
              color: "#FAFAF9",
              padding: "14px 20px",
              fontSize: "14px",
              fontWeight: "500",
              maxWidth: "400px",
              boxShadow: "0 20px 60px -15px rgba(0,0,0,0.3)",
            },
            success: {
              iconTheme: { primary: "#22C55E", secondary: "#F0FDF4" },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#FEF2F2" },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);