import { createContext, useContext, useState, type ReactNode } from "react";
import { BsBox } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

type DrawerContextType = {
  drawerVisible: boolean;
  setDrawerVisible: (visible: boolean) => void;
};

const DrawerContext = createContext<DrawerContextType | null>(null);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <DrawerContext.Provider value={{ drawerVisible, setDrawerVisible }}>
      {children}
    </DrawerContext.Provider>
  );
}

// FORA do hook, no escopo do módulo
function Drawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("Drawer precisa estar dentro de <DrawerProvider>");
  const { drawerVisible, setDrawerVisible } = ctx;

  return (
    <>
      <div
        onClick={() => setDrawerVisible(false)}
        className={`
          fixed left-0 right-0 bottom-0 z-40 bg-black/40
          transition-opacity duration-300 ease-in-out
          ${drawerVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        style={{ top: "var(--header-height, 0px)" }}
      />

      <aside
        className={`
          fixed left-0 z-50 w-64 md:w-72 bg-white shadow-xl
          px-8 py-8 flex flex-col gap-6
          transition-transform duration-300 ease-out
          ${drawerVisible ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          top: "var(--header-height, 0px)",
          height: "calc(100dvh - var(--header-height, 0px))",
        }}
      >
        <div className="flex gap-4 text-plum-500 text-xl items-center">
          <FaHome />
          <p>Home</p>
        </div>
        <div className="flex gap-4 text-plum-500 text-xl items-center">
          <BsBox />
          <p>Produtos</p>
        </div>
      </aside>
    </>
  );
}

export default function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer precisa estar dentro de <DrawerProvider>");
  return {
    drawerVisible: ctx.drawerVisible,
    setDrawerVisible: ctx.setDrawerVisible,
    Drawer, // referência estável — sempre o MESMO componente
  };
}