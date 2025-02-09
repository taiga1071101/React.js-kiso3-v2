import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { url } from '../const';

export const Modal = (props) => {
  const closeModal = () => props.setShowModal(false);
  const token = useSelector((state) => state.token.value);
  const navigate = useNavigate();

  const deleteReview = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const res = await axios.delete(`${url}/books/${props.reviewId}`, { headers: headers });
      console.log('削除成功', res);
      closeModal();
      navigate('/reviewList');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-2.5 rounded-sm'>
        <p>本当に削除しますか？</p>
        <button onClick={closeModal}>キャンセル</button>
        <button onClick={deleteReview}>OK</button>
      </div>
    </div>
  );
};