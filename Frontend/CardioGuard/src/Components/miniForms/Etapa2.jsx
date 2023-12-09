import React from 'react'
import Select from 'react-select'
import './etapas.css'
import { useState } from 'react';


const optionsSaude = [
  { value: 1, label: 'Normal' },
  { value: 2, label: 'Acima do normal' },
  { value: 3, label: 'Muito acima do normal' },
]

const getLabelForValuecho = (value) => {
  const selectedOptionCholesterol = optionsSaude.find(option => option.value === value);
  return selectedOptionCholesterol ? selectedOptionCholesterol.label : '';
};

const getLabelForValuegluc = (value) => {
  const selectedOptiongluc = optionsSaude.find(option => option.value === value);
  return selectedOptiongluc ? selectedOptiongluc.label : '';
};



export const Etapa2 = ({data, updateFieldHandler}) => {

  const [selectedOptionCholesterol, setSelectedOptionCholesterol] = useState({ value: data.cholesterol, label: getLabelForValuecho(data.cholesterol) });
  const [selectedOptiongluc, setSelectedOptiongluc] = useState({ value: data.gluc, label: getLabelForValuegluc(data.gluc) });

  const handleSelectChangecholesterol = (selectedOption) => {
    setSelectedOptionCholesterol(selectedOption);
    updateFieldHandler("cholesterol", selectedOption.value)
  };

  const handleSelectChangegluc = (selectedOption) => {
    setSelectedOptiongluc(selectedOption);
    updateFieldHandler("gluc", selectedOption.value)
  };

  return (
    <>
    <div className='campo'>
        <label htmlFor="ap_hi">Pressão Arterial Sistólica:</label>
        <input type='number' name='ap_hi' id='ap_hi' required value={data.ap_hi} onChange={(e) => updateFieldHandler("ap_hi", e.target.value)}/>
      </div>
      <div className='campo'>
        <label htmlFor="ap_lo">Pressão Arterial Diastólica:</label>
        <input type='number' name='ap_lo' id='ap_lo' required value={data.ap_lo} onChange={(e) => updateFieldHandler("ap_lo", e.target.value)}/>
      </div>
      <div className='campo'>
      <label htmlFor="cholesterol">Colesterol:</label>
        <Select options={optionsSaude} onChange={handleSelectChangecholesterol} value={selectedOptionCholesterol}></Select>
      </div>
      <div className='campo'>
      <label htmlFor="gluc">Glicose:</label>
        <Select options={optionsSaude} onChange={handleSelectChangegluc} value={selectedOptiongluc}></Select>
      </div>
    </>
  )
}

export default Etapa2