import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import logo from "../../assets/img/logo.png";

export const LoginForm = ({ onToggleForm, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, loading, error, clearError } = useLogin();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const identifier = formData.username.trim();
    const credentials = identifier.includes("@")
      ? { email: identifier, password: formData.password }
      : { username: identifier, password: formData.password };

    const result = await login(credentials);
    
    if (result.success) {
      if (onLoginSuccess) {
        onLoginSuccess(result.data.userDetails);
      }
    } else {
      console.error("Error en login:", result.error);
    }
  };

  return (
    <section className="h-screen w-screen flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
        <div className="block rounded-lg bg-white shadow-lg">
          <div className="lg:flex lg:flex-wrap">
            <div className="px-4 md:px-0 lg:w-6/12">
              <div className="md:mx-6 md:p-12">
                <div className="text-center">
                  <img 
                    src={logo} 
                    alt="San Judas Tadeo" 
                    className="mx-auto w-20 h-20 mb-4 object-contain"
                  />
                  <h4 className="mb-6 mt-1 pb-1 text-xl font-semibold text-neutral-800">
                    Comunidad San Judas Tadeo
                  </h4>
                </div>

                <form onSubmit={handleSubmit}>
                  <p className="mb-4 text-neutral-800">Inicia sesión en tu cuenta</p>
                  
                  {error && (
                    <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="relative mb-4">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-neutral-700 placeholder:text-neutral-500 border-b-2 border-neutral-300 focus:border-orange-500"
                      placeholder="Usuario o correo electrónico"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="relative mb-4">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-neutral-700 placeholder:text-neutral-500 border-b-2 border-neutral-300 focus:border-orange-500"
                      placeholder="Contraseña"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-6 pb-1 pt-1 text-center">
                    <button
                      className="mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-0 active:shadow-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: "#ff9900"
                      }}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                    </button>

                    <a href="#!" className="text-sm hover:underline" style={{ color: "#0975c6" }}>
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <div className="flex items-center justify-between pb-6">
                    <p className="mb-0 me-2 text-sm">¿No tienes una cuenta?</p>
                    <button
                      type="button"
                      className="inline-block rounded border-2 px-6 py-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-opacity-5 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        borderColor: "#0975c6",
                        color: "#0975c6"
                      }}
                      onClick={onToggleForm}
                      disabled={loading}
                    >
                      Registrarse
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none" style={{
              background: "linear-gradient(to right, #0975c6, #6ecfff)"
            }}>
              <div className="px-4 py-6 text-center text-white md:mx-6 md:p-6">
                <h4 className="mb-6 text-xl font-semibold">
                  Únete a nuestra comunidad
                </h4>
                <p className="text-sm">
                  Inicia sesión y vuelve a conectar con tus compañeros. 
                  Comparte tus ideas, sigue los proyectos y 
                  mantente al día con lo que pasa en la comunidad SJT.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}