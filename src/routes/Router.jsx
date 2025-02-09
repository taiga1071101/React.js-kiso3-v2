import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { SignUp } from '../pages/SignUp.jsx';
import { Login } from '../pages/Login.jsx';
import { ReviewList } from '../pages/ReviewList.jsx';
import { EditUser } from '../pages/EditUser.jsx';
import { NewReview } from '../pages/NewReview.jsx';
import { ReviewDetail } from '../pages/ReviewDetail.jsx';
import { EditReview } from '../pages/EditReview.jsx';

export const Router = () => {
  const isLogin = useSelector((state) => state.token.value);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ isLogin ? <Navigate replase to="/reviewlist" /> : <Login />} />
        <Route path='/signup' element={ isLogin ? <Navigate replase to="/reviewlist" /> : <SignUp />} />
        <Route path='/login' element={ isLogin ? <Navigate replase to="/reviewlist" /> : <Login />} />
        <Route path='reviewList' element={<ReviewList />} />
        <Route path="/profile" element={ isLogin ? <EditUser /> : <Navigate replase to="/login" /> } />
        <Route path="/new" element={ isLogin ? <NewReview /> : <Navigate replase to="/login" /> } />
        <Route path='/detail/:review_id' element={ isLogin ? <ReviewDetail /> : <Navigate replase to="/login" /> } />
        <Route path='/edit/:review_id' element={ isLogin ? <EditReview /> : <Navigate replase to="/login" /> } />
      </Routes>
    </BrowserRouter>
  );
};
