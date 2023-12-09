// LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { authenticateUser,getUuidUser,isAuthenticated, logoutUser } from '../../Auth';
import { useNavigate,Navigate} from 'react-router-dom';
import './Menu.css'


const Menu = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();


  if (isAuthenticated()==false) {
    return <Navigate to="/" replace />;
  }
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuario = await getUuidUser(localStorage.getItem("user_email"));
        setName(usuario.usuário.name);

      } catch (error) {
        console.error('Erro ao obter usuário:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickSair = () => {
    logoutUser()
    navigate('/')
  }

  const handleClickDashboard = () => {
    navigate('/dashboard')
  }
  const handleClickDNewTeste = () => {
    navigate('/newteste')
  }

  return (
    <div className='menu'>
        <div className='left-buttons'>
            <button className='button-menu' onClick={handleClickDNewTeste}>Novo Teste</button>
            <div className="divider"></div>
            <button className='button-menu' onClick={handleClickDashboard}>Meus Testes</button>
        </div>
        <div className='rigth-buttons'>
            <p className='nome'>Olá, {name}</p>
            <button className='button-menu' onClick={handleClickSair}>Sair</button>
        </div>
    </div>
  );
};

export default Menu;
