import { forwardRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GoPlus } from "react-icons/go";
import { IoMenu } from "react-icons/io5";
import useDrawer from "./Drawer.tsx";

const Header = forwardRef<HTMLElement>((_, ref) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { drawerVisible, setDrawerVisible } = useDrawer();

  return (
    <header
      ref={ref}
      className="relative w-full py-4 gap-16 flex flex-row justify-between items-center bg-white border-b border-brand-100 px-4 z-50"
    >
      <div className="flex items-center gap-3 md:gap-4">
        {isAuthenticated && isAdmin && (
          <IoMenu
            className="text-2xl text-purple-500 cursor-pointer shrink-0 md:ml-2"
            onClick={() => setDrawerVisible(!drawerVisible)}
          />
        )}
        <div className="flex flex-col leading-none shrink-0 md:pl-4">
          <span
            className="cursor-pointer text-(--primary)/90 text-4xl font-script"
            onClick={() => navigate("/")}
          >
            Ester
          </span>
          <span className="text-[0.85rem] font-semibold tracking-[0.35em] text-purple-700 uppercase">
            Calçados
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!isAuthenticated &&
          location.pathname !== "/User/sign" &&
          location.pathname !== "/User/register" && (
            <Link to={"/User/sign"}>
              <button className="border-0 items-center px-4 py-2 font-medium bg-plum-600 rounded-full cursor-pointer font-sans hover:scale-105 duration-300 transition-all text-white">
                Entrar
              </button>
            </Link>
          )}

        {isAuthenticated &&
          isAdmin &&
          location.pathname !== "/product/register" && (
            <Link to="/product/register">
              <button className="bg-plum-600 rounded-full text-white text-[1em] py-2 px-4 font-normal font-sans cursor-pointer hover:scale-105 duration-300 transition-all flex gap-2 items-center justify-center">
                <GoPlus className="text-white text-2xl" />
                Novo Produto
              </button>
            </Link>
          )}
      </div>
    </header>
  );
});

export default Header;