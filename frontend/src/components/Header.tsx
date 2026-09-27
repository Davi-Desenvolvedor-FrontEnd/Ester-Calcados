"use client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GoPlus } from "react-icons/go";

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 gap-16 flex flex-row justify-between items-center bg-white border-b border-brand-100 px-4">
      <div className="flex flex-col leading-none shrink-0 md:pl-8">
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
}
