"use client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AiFillPlusCircle } from "react-icons/ai";

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate()

  return (
    <header className="w-full py-4 gap-16 flex flex-row justify-between items-center text-amber-50 bg-(--primary)/20 px-4">
      <div className="max-md:pl-2">
        <h1 className="cursor-pointer text-9xl max-md:text-4xl font-medium font-dancing" onClick={()=>navigate("/")}>
          Ester Calçados
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {!isAuthenticated &&
          location.pathname !== "/User/sign" &&
          location.pathname !== "/User/register" && (
            <Link to={"/User/sign"}>
              <button className="border-0 items-center px-4 py-2 font-medium cursor-pointer font-['Poppins'_'sans_serif']">
                <p className="text-[#2c2c2c] no-underline duration-300 hover:underline transition-all">
                  Entrar
                </p>
              </button>
            </Link>
          )}

        {isAuthenticated &&
          isAdmin &&
          location.pathname !== "/product/register" && (
            <Link
              to="/product/register"
              className="text-purple-600 hover:text-purple-800 transition-colors"
            >
              <AiFillPlusCircle className="text-6xl" />
            </Link>
          )}
      </div>
    </header>
  );
}
