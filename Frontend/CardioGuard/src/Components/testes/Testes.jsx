// LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { authenticateUser,isAuthenticated } from '../../Auth';
import { useNavigate,Navigate } from 'react-router-dom';
import ExibeTestes from './ExibeTeste';
import Vazio from '../dashboard/Vazio'
// import './home.css'

const Testes = () => {
  const navigate = useNavigate();
  const [testes, setTestes] = useState([]);

  if (isAuthenticated()==false) {
    return <Navigate to="/" replace />;
  }

  const getTestes =async (uuid) => {
    const formData = new FormData();
    formData.append('user_uuid', uuid);
    let url = 'http://127.0.0.1:5000/teste';
  
    try {
      const response = await fetch(url, {
        method: 'post',
        body: formData
      });
  
      const jsonResult = await response.json();
      setTestes(jsonResult)
      return jsonResult; // Retornar o resultado para quem chamou a função
    } catch (error) {
      console.error('Error:', error);
      // Tratar ou lançar novamente o erro, conforme necessário
      throw error;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const NewTestes = await getTestes(localStorage.getItem("user_uuid"));
        setTestes(NewTestes);

      } catch (error) {
        console.error('Erro ao obter usuário:', error);
      }
    };

    fetchData();
  }, []);




  const handleClickTeste = (uuid) => (event) => {

    // navigate('/resultado-teste', { state: { dadosArray } });
    console.log(uuid)

    console.log(`Elemento clicado com ID: ${uuid}`);
  };

  console.log(testes.testes)
  return (testes.testes && testes.testes.length !== 0) ? (
    <div className='all-testes'>
        {testes.testes.map(item => (
        <ExibeTestes key={item.uuid} nome={item.name} data={item}/>
      ))}
    </div>
  ) : (
    <Vazio></Vazio>
  );
};

export default Testes;
