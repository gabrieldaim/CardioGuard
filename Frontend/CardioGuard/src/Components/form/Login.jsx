// LoginForm.jsx
import React, { useState } from 'react';
import { authenticateUser,isAuthenticated } from '../../Auth';
import { useNavigate,Navigate,Link } from 'react-router-dom';
import './form.css'

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  if (isAuthenticated()==true) {
    return <Navigate to="/dashboard" replace />;
  }

  const Login = async (email,password) =>{
    const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      let url = 'http://127.0.0.1:5000/login';
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '' || password === ''){
      setErroSenha("Preencha todos os campos!")
    }else{
      const login  = await Login(email,password)
      console.log(login)
      if (login == "Email ou senha incorretos!"){
        setErroSenha("Email ou senha incorretos!")
      }else{
        navigate('/dashboard')
      }
    }




  };

  return (
    <>
    <form onSubmit={handleSubmit} className='login-form'>
      <h1 className='title-form'>Faça Login</h1>
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
      {erroSenha && <p style={{ color: 'red',fontFamily:'Poppins', marginTop: -10}}>{erroSenha}</p>}
      <button type="submit">Login</button>
    </form>
    <p>Ainda não possui uma conta? <Link to='/'>Registre-se!</Link> </p>
    </>
  );
};

export default LoginForm;
