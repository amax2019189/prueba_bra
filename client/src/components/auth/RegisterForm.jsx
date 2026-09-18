import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import logo from "../../assets/img/logo.png";

export const RegisterForm = ({ onToggleForm, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const { register, loading, error, clearError } = useRegister();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "profilePicture") {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await register(formData);
    
    if (result.success) {
      if (onRegisterSuccess) {
        onRegisterSuccess(result.data.user);
      }
    } else {
      console.error("Error en registro:", result.error);
    }
  };

  return (
    <section className="h-screen w-screen flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-5xl mx-4 max-h-screen overflow-y-auto">
        <div className="block rounded-lg bg-white shadow-lg">
          <div className="lg:flex lg:flex-wrap">
            {/* Panel gradient - Izquierda */}
            <div className="flex items-center rounded-t-lg lg:w-5/12 lg:rounded-l-lg lg:rounded-tr-none" style={{
              background: "linear-gradient(to right, #0975c6, #6ecfff)"
            }}>
              <div className="px-6 py-8 text-white md:mx-6 md:p-8">
                <div className="text-center mb-6">
                  <h4 className="mb-4 text-xl font-semibold">
                    Únete a nuestra comunidad
                  </h4>
                  <p className="text-sm">
                    Forma parte de nuestra comunidad estudiantil. 
                    Comparte tus ideas, únete a actividades especiales y 
                    mantente conectado con otros estudiantes de San Judas Tadeo.
                  </p>
                </div>
              </div>
            </div>

            {/* Formulario - Derecha */}
            <div className="px-4 md:px-0 lg:w-7/12">
              <div className="md:mx-6 md:p-8">
                <div className="text-center mb-6">
                  <img 
                    src={logo} 
                    alt="San Judas Tadeo" 
                    className="mx-auto w-20 h-20 mb-4 object-contain"
                  />
                  <h4 className="mb-2 text-2xl font-semibold text-neutral-800">
                    Crear Cuenta
                  </h4>
                  <p className="text-neutral-600">
                    Completa la información para unirte a nosotros
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Nombre y Apellido en dos columnas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-neutral-700 placeholder:text-neutral-500 border-b-2 border-neutral-300 focus:border-orange-500"
                        placeholder="Nombre"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        className="block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-neutral-700 placeholder:text-neutral-500 border-b-2 border-neutral-300 focus:border-orange-500"
                        placeholder="Apellido"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="relative mb-4">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-neutral-700 placeholder:text-neutral-500 border-b-2 border-neutral-300 focus:border-orange-500"
                      placeholder="Nombre de usuario"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="relative mb-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-neutral-700 placeholder:text-neutral-500 border-b-2 border-neutral-300 focus:border-orange-500"
                      placeholder="Correo electrónico"
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

                  <div className="relative mb-4">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear text-neutral-700 placeholder:text-neutral-500 border-b-2 border-neutral-300 focus:border-orange-500"
                      placeholder="Confirmar contraseña"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="relative mb-6">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Foto de perfil (opcional)
                    </label>
                    <input
                      type="file"
                      name="profilePicture"
                      onChange={handleInputChange}
                      accept="image/*"
                      className="block w-full text-sm text-neutral-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 disabled:opacity-50"
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-4 text-center">
                    <button
                      className="inline-block w-full rounded px-6 py-3 text-sm font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-0 active:shadow-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: "#ff9900"
                      }}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Registrando..." : "Crear Cuenta"}
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="mb-2 text-sm text-neutral-600">
                      ¿Ya tienes una cuenta?
                    </p>
                    <button
                      type="button"
                      className="inline-block rounded border-2 px-6 py-2 text-sm font-medium leading-normal transition duration-150 ease-in-out hover:bg-opacity-5 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        borderColor: "#0975c6",
                        color: "#0975c6"
                      }}
                      onClick={onToggleForm}
                      disabled={loading}
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}