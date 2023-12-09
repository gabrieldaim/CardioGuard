// LoginForm.jsx
import React, { useState } from 'react';
import { authenticateUser,isAuthenticated } from '../../Auth';
import { useNavigate,Navigate } from 'react-router-dom';
import Etapa1 from '../miniForms/etapa1';
import Etapa2 from '../miniForms/etapa2';
import Etapa3 from '../miniForms/etapa3';

import { useForm } from '../../hooks/useForm';


const CreateTeste = async (data) =>{

  const formData = new FormData();
    formData.append('user_uuid',localStorage.getItem("user_uuid"))
    formData.append('name',data.name)
    formData.append('age', data.age);
    formData.append('gender', data.gender);
    formData.append('height', data.height);
    formData.append('weight', data.weight);
    formData.append('ap_hi', data.ap_hi);
    formData.append('ap_lo', data.ap_lo);
    formData.append('cholesterol', data.cholesterol);
    formData.append('gluc', data.gluc);
    formData.append('smoke', data.smoke);
    formData.append('alco', data.alco);
    formData.append('active', data.active);

    let url = 'http://127.0.0.1:5000/testes';
    try {
      const response = await fetch(url, {
        method: 'post',
        body: formData
      });
  
      
      return response; // Retornar o resultado para quem chamou a função
    } catch (error) {
      console.error('Error:', error);
      // Tratar ou lançar novamente o erro, conforme necessário
      throw error;
    }
  }




const NovoTeste = () => {

  const navigate = useNavigate();

  let formTeamplate = {
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    ap_hi: 120,
    ap_lo: 80,
    cholesterol: "",
    gluc: "",
    smoke: "",
    alco: "",
    active: "",
  }

  const[data, setData] = useState(formTeamplate)

  const updateFieldHandler = (key, value) => {
    setData((prev)=>{
      return { ...prev, [key]: value}
    })
  }

  const formComponents = [
  <Etapa1 data={data} updateFieldHandler={updateFieldHandler}/>, 
  <Etapa2 data={data} updateFieldHandler={updateFieldHandler}/>, 
  <Etapa3 data={data} updateFieldHandler={updateFieldHandler}/>]

  const {currentStep,currentComponent,changeStep, isLastStep, isFirstStep} = useForm(formComponents)

  if (isAuthenticated()==false) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async () =>{
    CreateTeste(data).then(() => navigate('/dashboard'))
  }


  return (
    <div className='bodyForm'>
    <div className='title'>
      Novo Teste
    </div>
    <form onSubmit={(e)=>changeStep(currentStep+1,e)}>
    <div className='componenteFormulario'>
      {currentComponent}
    </div>
    <div className='actions'>
      {!isFirstStep && (<button className='voltar' type='button' onClick={()=>changeStep(currentStep-1)}>Voltar</button>)}
      {isLastStep ? (<button className='avancar' type='button' onClick={handleSubmit}>Finalizar</button>) : (<button className='avancar' type='submit'>Avançar</button>)}
    </div>
    </form>
    </div>
  );
};

export default NovoTeste;
