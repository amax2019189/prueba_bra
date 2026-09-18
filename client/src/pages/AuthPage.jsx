import React, { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";

export const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSuccess = (user) => {
    // Llamar la función de callback del App para manejar la redirección
    if (onLoginSuccess) {
      onLoginSuccess(user);
    }
  };

  const handleRegisterSuccess = () => {
    // Cambiar automáticamente al login después del registro exitoso
    setIsLogin(true);
  };

  return (
    <>
      {isLogin ? (
        <LoginForm 
          onToggleForm={handleToggleForm}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <RegisterForm 
          onToggleForm={handleToggleForm}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </>
  );
}