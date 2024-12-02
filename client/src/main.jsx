import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthProvider";
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <NextUIProvider>
          <main className="dark text-foreground bg-background min-h-screen">
            <App />
          </main>
        </NextUIProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);
