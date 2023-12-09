// LoginForm.jsx
import React, { useState } from 'react';
import { authenticateUser,isAuthenticated } from '../../Auth';
import { useNavigate,Navigate,useLocation  } from 'react-router-dom';
import './custom-confirm-alert.css'
import { confirmAlert } from 'react-confirm-alert';

const ResultadoTeste = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated()==false) {
    return <Navigate to="/" replace />;
  }

  const data = location.state ? location.state.data : {};
  console.log(data)

  const handleClickDelete = () => {
    confirmAlert({
      title: 'Deseja realmente excluir seu teste?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => alert('Click Yes')
        },
        {
          label: 'Não',
          onClick: () => alert('Click No')
        }
      ]
    });
  };

  return (
    <div className='exibe-resultado'>
        <button onClick={handleClickDelete}>Confirm dialog</button>
    </div>
  );
};

export default ResultadoTeste;
