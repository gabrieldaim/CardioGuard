// LoginForm.jsx
import React, { useState } from 'react';
import { authenticateUser,isAuthenticated } from '../../Auth';
import { useNavigate,Navigate } from 'react-router-dom';
import './dashboard.css'
import Menu from '../menu/Menu';

const Dashboard = ({corpo}) => {
  const navigate = useNavigate();
  

  if (isAuthenticated()==false) {
    return <Navigate to="/" replace />;
  }



  return (
    <div className='dashboard'>
        <Menu></Menu>
        {corpo}
    </div>
  );
};

export default Dashboard;
