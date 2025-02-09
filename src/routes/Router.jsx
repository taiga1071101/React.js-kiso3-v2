import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { SignUp } from '../pages/SignUp.jsx';
import { Login } from '../pages/Login.jsx';

export const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
