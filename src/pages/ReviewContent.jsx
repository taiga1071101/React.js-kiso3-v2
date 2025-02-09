import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { url } from '../const.js';

export const ReviewContent = () => {
    const [reviews, setReviews] = useState([]);
    const offset = useSelector((state) => state.offset.count);
    const token = useSelector((state) => state.token.value);
    const headers = { 'Authorization': `Bearer ${token}` };
    const navigate = useNavigate();
  
    const displayReviewList = async () => {
      try {
        const res = await axios.get(`${url}/public/books?offset=${offset}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      displayReviewList();
    }, [offset]);

    const transitionToDetail = (id) => {
      sendReviewLog(id);
      navigate(`/detail/${id}`);
    }

    const sendReviewLog = async (id) => {
      try {
        const res = await axios.post(`${url}/logs`, { selectBookId: id }, { headers: headers } );
        console.log('ログ送信完了', res);
      } catch (err) {
        console.error(err);
      }
    }

  return (
    <ul className='mx-40 my-10'>
      {
        reviews.map(review => {
          return (
            <li key={review.id} onClick={() => transitionToDetail(review.id)} className='p-2 border border-black cursor-pointer hover:bg-gray-100'>
              {review.title}
            </li>
          )
        })
      }
    </ul>
  )
}