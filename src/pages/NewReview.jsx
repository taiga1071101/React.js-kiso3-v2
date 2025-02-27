import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { url } from '../const.js';
import { Header } from '../components/Header';

export const NewReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const token = useSelector((state) => state.token.value);
  const navigate = useNavigate();
  const headers = { 'Authorization': `Bearer ${token}` };
  const apiUrl = url;

  const onCreateReview = async (data) => {
    try {
      const { title, url, detail, review } = data;
      const requestData = {
        title,
        url,
        detail,
        review
      };
      const res = await axios.post(`${apiUrl}/books`, requestData, { headers: headers });
      console.log(`投稿完了${res}`);
      navigate('/reviewList');
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <>
    <Header />
    <main>
      <h1>書籍レビュー投稿画面</h1>
      <form onSubmit={handleSubmit(onCreateReview)}>
        <div className='mx-100 text-left'>
          <div className='my-5'>
            <label>タイトル</label><br />
            <input
              className='border w-full'
              type='text'
              {...register('title', {
                required: 'タイトルを入力してください。'
              })}
            />
            <p>{errors.title?.message}</p>
          </div>

          <div className='my-5'>
            <label>URL</label><br />
            <input 
              className='border w-full'
              type='text'
              {...register('url', {
                required: 'URLを入力してください。'
              })}
            />
            <p>{errors.url?.message}</p>
          </div>

          <div className='my-5'>
            <label>詳細</label><br />
            <input 
              className='border w-full'
              type='text'
              {...register('detail', {
                required:'詳細を入力してください。'
              })}
            />
            <p>{errors.detail?.message}</p>
          </div>


          <div className='my-5'>
            <label>レビュー</label><br />
            <textarea 
              className='border w-full'
              {...register('review', {
                required: 'レビューを入力してください。'
              })}
            />
            <p>{errors.review?.message}</p>
          </div>
        </div>

        <button type="submit">投稿</button>
      </form>
    </main>
    </>
  )
}