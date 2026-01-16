"use client";
import Loading from "@/component/Loading";
import { useState } from "react";

export default function () {
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"Login" | "Register">("Login");

  return (
    <div className=" flex items-center justify-center my-10">
      <div className="min-h-125 max-w-[90%] md:max-w-[30%] min-w-[30%] flex flex-col items-center justify-center">
        <div className="w-full">
          {/* Cabeçalho do formulário */}
          <div className="text-center mb-14 ">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {type === "Login" ? "Bem-vindo de volta!" : "Crie sua conta"}
            </h2>
          </div>

          {/* Formulário */}
          <form className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl shadow-xl p-8 border border-purple-200 ">
            {/* Indicador visual do tipo de formulário */}
            <div className="flex w-full h-12 items-center mb-8 bg-purple-200 rounded-full relative shadow-inner">
              <div
                className={`absolute rounded-full bg-linear-to-r from-pink-500 to-purple-700 shadow-lg duration-300 w-1/2 h-full ease-in-out transition-all ${
                  type == "Login" ? "translate-x-0" : "translate-x-full"
                }`}
              ></div>
              <button
                type="button"
                onClick={() => setType("Login")}
                className={`w-1/2 h-full relative flex items-center justify-center py-3 rounded-full text-center font-semibold transition-all duration-300 ${
                  type === "Login"
                    ? "text-white"
                    : "text-purple-800 hover:text-purple-900"
                }`}
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => setType("Register")}
                className={`w-1/2 h-full relative flex items-center justify-center py-3 rounded-full text-center font-semibold transition-all duration-300 ${
                  type === "Register"
                    ? "text-white"
                    : "text-purple-800 hover:text-purple-900"
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
                    className="block text-base font-medium text-gray-700 mb-2 ml-2"
                  >
                    Nome completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Como gostaria de ser chamado(a)"
                    className="w-full px-4 py-3 bg-white/80 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  />
                </div>
              )}

              {/* Campo Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-medium text-gray-700 mb-2 ml-2"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  className="w-full px-4 py-3 bg-white/80 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Campo Senha */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-base font-medium text-gray-700 mb-2 ml-2"
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
                  className="w-full px-4 py-3 bg-white/80 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400"
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
                    className="block text-base font-medium text-gray-700 mb-2 ml-2"
                  >
                    Confirmar senha
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Digite a senha novamente"
                    className="w-full px-4 py-3 bg-white/80 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-400"
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
                      className="h-4.5 w-4.5 accent-purple-700 focus:outline-none"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-base text-gray-700"
                    >
                      Lembrar-me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-base font-medium text-purple-700 hover:text-purple-800 transition-colors"
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
                    className="h-4 w-4 mt-1 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-base text-gray-700"
                  >
                    Concordo com os{" "}
                    <a
                      href="#"
                      className="font-medium text-purple-700 hover:text-purple-800"
                    >
                      Termos de Serviço
                    </a>{" "}
                    e{" "}
                    <a
                      href="#"
                      className="font-medium text-purple-700 hover:text-purple-800"
                    >
                      Política de Privacidade
                    </a>
                  </label>
                </div>
              )}

              {/* Botão de submit */}
              <button
                type="submit"
                onClick={() => setIsLoading(true)}
                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white shadow-md transition-all duration-300 flex items-center justify-center ${
                  isLoading
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-linear-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 hover:shadow-lg active:scale-[0.98]"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loading />
                  </>
                ) : type === "Login" ? (
                  "Entrar na minha conta"
                ) : (
                  "Criar minha conta"
                )}
              </button>
            </div>

            {/* Rodapé do formulário */}
            <div className="mt-6 pt-6 border-t border-purple-300 text-center">
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
    </div>
  );
}
