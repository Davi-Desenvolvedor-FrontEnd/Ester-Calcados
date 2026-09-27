import { StrictMode, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { DrawerProvider } from "./components/Drawer.tsx";
import { useHeaderHeight } from "./hooks/useHeaderHeight.tsx";

function Root() {
  const headerRef = useRef<HTMLElement>(null);
  useHeaderHeight(headerRef);

  return (
    <DrawerProvider>
      <Header ref={headerRef} />
      <App />
    </DrawerProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);