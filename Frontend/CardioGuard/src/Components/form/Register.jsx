// LoginForm.jsx
import React, { useState } from 'react';
import { authenticateUser,isAuthenticated } from '../../Auth';
import { useNavigate,Navigate, Link } from 'react-router-dom';
import './form.css'

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [SecondPassword, setSecondPassword] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  if (isAuthenticated()==true) {
    return <Navigate to="/dashboard" replace />;
  }

  const Register = async (email,password,nome) =>{

    const formData = new FormData();
      formData.append('name',nome)
      formData.append('email', email);
      formData.append('password', password);
      let url = 'http://127.0.0.1:5000/users';
      try {
        const response = await fetch(url, {
          method: 'post',
          body: formData
        });
    
        const jsonResult = await authenticateUser(await response.json(),email);
        return jsonResult; // Retornar o resultado para quem chamou a função
      } catch (error) {
        console.error('Error:', error);
        // Tratar ou lançar novamente o erro, conforme necessário
        throw error;
      }
    }

  const confirmPassword = (password1, password2) => {
    if(password1 == password2) {
      return "ok"
    }else{
      setErroSenha("As senhas precisam ser iguais.")
      return "As senhas precisam ser iguais."
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let resultadoSenha
    if (name === '' || email === '' || password === ''){
      setErroSenha("Preencha todos os campos!")
    }else{
      resultadoSenha = confirmPassword(password, SecondPassword)
    }
    if (resultadoSenha == 'ok') {
      const register  = await Register(email,password,name)
      console.log(register)
      if (register == true){
          navigate('/dashboard')
      }else if( register == "email já existente!"){
          setErroSenha('email já existente!')
      }else{
        setErroSenha('Preencha todos os campos')
      }
    }
  };

  return (
  <>
    <form onSubmit={handleSubmit}>
      <h1 className='title-form'>Registre-se!</h1>
      <div className='campo'>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='campo'>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='campo'>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='campo'>
        <label htmlFor="secondPassword">Confirme sua senha:</label>
        <input
          type="password"
          id="secondPassword"
          value={SecondPassword}
          onChange={(e) => setSecondPassword(e.target.value)}
        />
      </div>
      {erroSenha && <p style={{ color: 'red',fontFamily:'Poppins', marginTop: -10}}>{erroSenha}</p>}
      <button type="submit">Criar conta</button>
    </form>
    <p>Já possui uma conta? <Link to='./login'>Faça o Login!</Link> </p>
    </>  
  );
};

export default RegisterForm;
