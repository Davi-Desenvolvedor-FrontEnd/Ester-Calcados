"use client";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
  }, []);

  return (
    <header className="w-full py-4 gap-16 flex flex-row justify-between text-amber-50 bg-amber-50">
      <div className="max-md:pl-2">
        <h1 className="text-9xl max-md:text-4xl font-medium font-dancing">
          Ester Calçados
        </h1>
      </div>
      {!userAuthenticated &&
        location.pathname != "/User/sign" &&
        location.pathname != "/User/register" && (
          <Link to={"/User/sign"}>
            <button className="border-0 items-center px-4 py-2 font-medium  cursor-pointer font-['Poppins'_'sans_serif']">
              <p className="text-[#2c2c2c] no-underline  duration-300 hover:underline transition-all">
                Entrar
              </p>
            </button>
          </Link>
        )}
    </header>
  );
}