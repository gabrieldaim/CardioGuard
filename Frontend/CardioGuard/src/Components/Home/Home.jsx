// LoginForm.jsx
import React, { useState } from 'react';
import { authenticateUser,isAuthenticated } from '../../Auth';
import { useNavigate,Navigate } from 'react-router-dom';
import './home.css'

const Home = ({formulario}) => {
  const navigate = useNavigate();

  if (isAuthenticated()==true) {
    return <Navigate to="/dashboard" replace />;
  }



  return (
    <main>
      <h1>Quer saber mais sobre o seu coração e prevenir possíveis problemas? </h1>
      <h2>Junte-se a nós e faça o teste agora!</h2>
    {formulario}
    </main>
  );
};

export default Home;
