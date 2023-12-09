import React from 'react'
import Select from 'react-select'
import './etapas.css'
import { useState } from 'react';



const optionsGender = [
  { value: 1, label: 'Mulher' },
  { value: 2, label: 'Homem' },
]

const getLabelForValue = (value) => {
  const selectedOption = optionsGender.find(option => option.value === value);
  return selectedOption ? selectedOption.label : '';
};


export const Etapa1 = ({data, updateFieldHandler}) => {
  const [selectedOption, setSelectedOption] = useState({ value: data.gender, label: getLabelForValue(data.gender) });


  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    updateFieldHandler("gender", selectedOption.value)
  };


  return (
    <>
    <div className='campo'>
        <label htmlFor="test-name">Nome do teste:</label>
        <input type='text' name='test-name' id='test-name' required value={data.name} onChange={(e) => updateFieldHandler("name", e.target.value)}/>
      </div>
      <div className='campo'>
        <label htmlFor="peso">Peso(Kg):</label>
        <input type='number' name='peso' id='peso' required value={data.weight} onChange={(e) => updateFieldHandler("weight", e.target.value)}/>
      </div>
      <div className='campo'>
        <label htmlFor="altura">Altura(cm):</label>
        <input type='number' name='altura' id='altura' required value={data.height} onChange={(e) => updateFieldHandler("height", e.target.value)}/>
      </div>
      <div className='campo'>
      <label htmlFor="Genero">Gênero:</label>
        <Select options={optionsGender} onChange={handleSelectChange} value={selectedOption}></Select>
      </div>

    </>
  )
}

export default Etapa1