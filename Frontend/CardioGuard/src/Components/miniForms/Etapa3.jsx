import React from 'react'
import Select from 'react-select'
import './etapas.css'
import { useState } from 'react';

const optionsYN = [
  { value: 0, label: 'Não' },
  { value: 1, label: 'Sim' },
]

const getLabelForValueSmoke = (value) => {
  const selectedOptionSmoke = optionsYN.find(option => option.value === value);
  return selectedOptionSmoke ? selectedOptionSmoke.label : '';
};

const getLabelForValueAlco = (value) => {
  const selectedOptionAlco = optionsYN.find(option => option.value === value);
  return selectedOptionAlco ? selectedOptionAlco.label : '';
};

const getLabelForValueActive = (value) => {
  const selectedOptionActive = optionsYN.find(option => option.value === value);
  return selectedOptionActive ? selectedOptionActive.label : '';
};

export const Etapa3 = ({data, updateFieldHandler}) => {
  const [selectedOptionSmoke, setSelectedOptionSmoke] = useState({ value: data.smoke, label: getLabelForValueSmoke(data.smoke) });
  const [selectedOptionAlco, setSelectedOptionAlco] = useState({ value: data.alco, label: getLabelForValueAlco(data.alco) });
  const [selectedOptionActive, setSelectedOptionActive] = useState({ value: data.active, label: getLabelForValueActive(data.active) });

  const handleSelectChangeSmoke = (selectedOption) => {
    setSelectedOptionSmoke(selectedOption);
    updateFieldHandler("smoke", selectedOption.value)
  };
  const handleSelectChangeAlco = (selectedOption) => {
    setSelectedOptionAlco(selectedOption);
    updateFieldHandler("alco", selectedOption.value)
  };
  const handleSelectChangeActive = (selectedOption) => {
    setSelectedOptionActive(selectedOption);
    updateFieldHandler("active", selectedOption.value)
  };

  return (
    <>
      <div className='campo'>
        <label htmlFor="age">Idade:</label>
        <input type='number' name='age' id='age' required value={data.age} onChange={(e) => updateFieldHandler("age", e.target.value)}/>
      </div>
      <div className='campo'>
      <label htmlFor="smoke">Tabagismo:</label>
        <Select options={optionsYN} onChange={handleSelectChangeSmoke} value={selectedOptionSmoke}></Select>
      </div>
      <div className='campo'>
      <label htmlFor="alco">Consumo de Álcool:</label>
        <Select options={optionsYN} onChange={handleSelectChangeAlco} value={selectedOptionAlco}></Select>
      </div>
      <div className='campo'>
      <label htmlFor="active">Atividade Física:</label>
        <Select options={optionsYN} onChange={handleSelectChangeActive} value={selectedOptionActive}></Select>
      </div>
    </>
  )
}

export default Etapa3