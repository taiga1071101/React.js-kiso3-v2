import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { url } from '../const';
import { Header } from '../components/Header';

export const EditUser = () => {
  const token = useSelector((state) => state.token.value);
  const headers = { 'Authorization': `Bearer ${token}` };
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await axios.get(`${url}/users`, { headers: headers});
      return res.data;
    }
  });

  const updateUserName = async (data) => {
    try {
      const { name } = data;
      const requestData = { name }
      const res = await axios.put(`${url}/users`, requestData, { headers: headers });
      console.log('更新成功', res);
      navigate('/reviewList');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1 className="m-5">ユーザー情報編集</h1>
        <form onSubmit={handleSubmit(updateUserName)}>
          <div className="m-10">
            <label>ユーザー名</label>
            <input 
              type="text"
              {...register('name', {
                required: "ユーザー名を入力してください。"
              })}
            />
            <p className="error-message">{errors.name?.message}</p>
          </div>
          <button type="submit">更新</button>
        </form>
      </main>
    </>
  );
};