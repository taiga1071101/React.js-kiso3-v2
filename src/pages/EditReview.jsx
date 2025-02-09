import React, { useState } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { url } from '../const.js';
import { Header } from "../components/Header.jsx";
import { Modal } from './Modal.jsx';

export const EditReview = () => {
  const token = useSelector((state) => state.token.value);
  const headers = { 'Authorization': `Bearer ${token}` };
  const { review_id } = useParams();
  const navigate = useNavigate();
  const apiUrl = url;
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await axios.get(`${apiUrl}/books/${review_id}`, { headers: headers});
      return res.data;
    }
  });

  const uploadReview = async (data) => {
    try {
      const { title, url, detail, review } = data;
      const requestData = { title, url, detail, review };
      const res = await axios.put(`${apiUrl}/books/${review_id}`, requestData, { headers: headers});
      console.log('更新完了', res);
      navigate(`/detail/${review_id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1>書籍レビュー編集画面</h1>
        <form onSubmit={handleSubmit(uploadReview)} className="m-10 p-5 text-left border border-black bg-sky-50">

          <div>
            <label>タイトル</label>
            <input 
              type="text"
              {...register("title", {
                required: "タイトルを入力してください。"
              })}
            />
            <p className="error-message">{errors.title?.message}</p>
          </div>

          <div className="my-2">
            <label>URL：</label>
            <input 
              type="text"
              {...register("url", {
                required: "URLを入力してください。"
              })}
            />
            <p className="error-message">{errors.url?.message}</p>
          </div>

          <div className="my-2">
            <label>詳細</label>
            <textarea 
              {...register("detail", {
                required: "詳細を入力してください。"
              })}
            />
            <p className="error-message">{errors.detail?.message}</p>
          </div>

          <div className="my-2">
            <label>レビュー</label>
            <textarea 
              {...register("review", {
                required: "レビューを入力してください。"
              })}
            />
            <p className="error-message">{errors.review?.message}</p>
          </div>

          <button type='submit'>更新</button>
        </form>
        <button onClick={openModal}>削除</button>
        { showModal && <Modal setShowModal={setShowModal} reviewId={review_id} />}
      </main>
    </>
  );
};