import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App'
import LoginForm from './Components/form/Login'
import Home from './Components/Home/Home'
import RegisterForm from './Components/form/Register'
import Dashboard from './Components/dashboard/dashboard'
import Testes from './Components/testes/Testes'
import ResultadoTeste from './Components/testes/ResultadoTeste'
import NovoTeste from './Components/testes/NovoTeste'


ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home formulario={<RegisterForm></RegisterForm>}></Home>}/>
        <Route path="/login" element={<Home formulario={<LoginForm></LoginForm>}></Home>}/>
        <Route path="/dashboard" element={<Dashboard corpo={<Testes></Testes>}></Dashboard>}/>
        <Route path="/resultado-teste" element={<Dashboard corpo={<ResultadoTeste></ResultadoTeste>}></Dashboard>}/>
        <Route path="/newteste" element={<Dashboard corpo={<NovoTeste></NovoTeste>}></Dashboard>}/>
      </Routes>

    </BrowserRouter>
  ,
)