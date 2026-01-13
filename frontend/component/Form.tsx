"use client";
import { useState } from "react";

interface FormProps {
  Type?: "Login" | "Register";
}

export default function Form({ Type }: FormProps) {
  const [type, setType] = useState(Type);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="min-h-125 w-[30%] flex flex-col items-center justify-center">
      <div className="w-full">
        {/* Cabeçalho do formulário */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {type === "Login" ? "Bem-vindo de volta!" : "Crie sua conta"}
          </h2>
          <p className="text-gray-600">
            {type === "Login"
              ? "Entre para ver seus pedidos e favoritos"
              : "Cadastre-se para uma experiência personalizada"}
          </p>
        </div>

        {/* Formulário */}
        <form className="bg-linear-to-br from-amber-50 to-amber-100 rounded-2xl shadow-xl p-8 border border-amber-200 ">
          {/* Indicador visual do tipo de formulário */}
          <div className="flex mb-8 bg-amber-200 rounded-full p-1 relative shadow-inner">
            <div
              className={`absolute top-2 bottom-2 rounded-full bg-linear-to-r from-pink-500 to-purple-700 shadow-lg duration-300 ease-in-out transition-all ${
                type == "Login"
                  ? "left-2 w-[calc(50%-8px)]"
                  : "left-[calc(50%+4px)] w-[calc(50%-8px)]"
              }`}
            ></div>
            <button
              type="button"
              onClick={() => setType("Login")}
              className={`flex-1 relative py-3 rounded-full text-center font-semibold transition-all duration-300 ${
                type === "Login"
                  ? "text-black"
                  : "text-amber-800 hover:text-amber-900"
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setType("Register")}
              className={`flex-1 relative py-3 rounded-full text-center font-semibold transition-all duration-300 ${
                type === "Register"
                  ? "text-black"
                  : "text-amber-800 hover:text-amber-900"
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Campos do formulário */}
          <div className="space-y-4">
            {/* Campo Nome (apenas para cadastro) */}
            {type === "Register" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Como gostaria de ser chamado(a)"
                  className="w-full px-4 py-3 bg-white/80 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400"
                />
              </div>
            )}

            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                className="w-full px-4 py-3 bg-white/80 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400"
                required
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder={
                  type === "Login"
                    ? "Digite sua senha"
                    : "Crie uma senha segura"
                }
                className="w-full px-4 py-3 bg-white/80 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400"
                required
              />
              {type === "Register" && (
                <p className="mt-2 text-xs text-gray-500">
                  Use pelo menos 8 caracteres com letras e números
                </p>
              )}
            </div>

            {/* Campo Confirmação de Senha (apenas para cadastro) */}
            {type === "Register" && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirmar senha
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  className="w-full px-4 py-3 bg-white/80 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  required
                />
              </div>
            )}

            {/* Lembrar-me e Esqueci a senha (apenas para login) */}
            {type === "Login" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Lembrar-me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors"
                >
                  Esqueci minha senha
                </a>
              </div>
            )}

            {/* Termos (apenas para cadastro) */}
            {type === "Register" && (
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 mt-1 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Concordo com os{" "}
                  <a
                    href="#"
                    className="font-medium text-amber-700 hover:text-amber-800"
                  >
                    Termos de Serviço
                  </a>{" "}
                  e{" "}
                  <a
                    href="#"
                    className="font-medium text-amber-700 hover:text-amber-800"
                  >
                    Política de Privacidade
                  </a>
                </label>
              </div>
            )}

            {/* Botão de submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white shadow-md transition-all duration-300 flex items-center justify-center ${
                isLoading
                  ? "bg-amber-400 cursor-not-allowed"
                  : "bg-linear-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 hover:shadow-lg active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processando...
                </>
              ) : type === "Login" ? (
                "Entrar na minha conta"
              ) : (
                "Criar minha conta"
              )}
            </button>
          </div>

          {/* Rodapé do formulário */}
          <div className="mt-6 pt-6 border-t border-amber-300 text-center">
            <p className="text-gray-600">
              {type === "Login" ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button
                type="button"
                className="font-semibold text-pink-700 hover:text-pink-800 transition-colors"
              >
                {type === "Login" ? "Cadastre-se" : "Faça login"}
              </button>
            </p>
          </div>
        </form>

        {/* Informações adicionais */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Ao continuar, você concorda com os Termos de Uso da Ester Calçados
          </p>
        </div>
      </div>
    </div>
  );
}
