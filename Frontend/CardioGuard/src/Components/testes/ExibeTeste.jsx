// LoginForm.jsx
import React, { useState } from 'react';
import { authenticateUser,isAuthenticated } from '../../Auth';
import { useNavigate,Navigate } from 'react-router-dom';
import './ExibeTeste.css'
import { confirmAlert } from 'react-confirm-alert';
import { excluirTeste, gerarPdf } from './functionsTeste';

const ExibeTestes = ({nome,data}) => {
  const navigate = useNavigate();

  if (isAuthenticated()==false) {
    return <Navigate to="/" replace />;
  }

  const handleClick = () => {
    confirmAlert({
      title: 'Deseja baixar seu teste?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => gerarPdf(data)
        },
        {
          label: 'Não',
          
        }
      ]
    });
  };

  const handleClickDelete = (e) => {
    e.stopPropagation();
    confirmAlert({
      title: 'Deseja realmente excluir seu teste?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => excluirTeste(data.uuid)
        },
        {
          label: 'Não',
          
        }
      ]
    });
    
  };

  return (
    <div className='exibe-teste' onClick={handleClick}>
        <img src="../../../public/images/icons8-lixeira.svg" alt="excluir" className='lixeira' onClick={handleClickDelete}/>
        <div className='imagem-teste'>
        <img src="../../../public/images/paper_2-[Convertido].png" alt={nome} className='img-teste' />
        </div>
        <div className='rodape-teste'>{nome}</div>
    </div>
  );
};

export default ExibeTestes;
