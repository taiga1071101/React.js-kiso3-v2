import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { set } from '../redux/tokenSlice.js';
import { url } from '../const';
import { Header } from '../components/Header.jsx';
import { useDispatch, useSelector } from 'react-redux';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (data) => {
    try {
      setIsSubmitting(true);
      const { email, password } = data;
      const requestData = { email, password };
      const res = await axios.post(`${url}/signin`, requestData);
      console.log('ログインに成功しました。', res);
      dispatch(set(res.data.token));
      navigate('/reviewList');
    } catch (err) {
      setErrorMessage(`${err.response?.data?.ErrorMessageJP || `ログイン中にエラーが発生しました。 ${err}`}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1>ログイン画面</h1>
        <p>{errorMessage}</p>
        <form onSubmit={handleSubmit(onLogin)} noValidate>
          <div className='m-5'>
            <label>メールアドレス</label>
            <input
              type="email"
              {...register("email", {
                required: "メールアドレスを入力してください。",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "有効なメールアドレスを入力してください。",
                },
              })}
            />
            <p className="error-message" id="email-error">{errors.email?.message}</p>
          </div>

          <div>
            <label>パスワード</label>
            <input
              type="password"
              {...register("password", {
                required: "パスワードを入力してください。",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-/:-@[-`{-~]).{8,}$/,
                  message: "パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください。",
                },
              })}
            />
            <p className="error-message" id="password-error">{errors.password?.message}</p>
          </div>

          <button type='submit' id='login-button' disabled={isSubmitting}>ログイン</button>
        </form>
        <Link to='/signup'>新規作成画面へ</Link>
      </main>
    </>
  )
}