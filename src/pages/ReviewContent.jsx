import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../const.js';
import { useSelector } from 'react-redux';

export const ReviewContent = () => {
    const [reviews, setReviews] = useState([]);
    const offset = useSelector((state) => state.offset.count);
  
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

  return (
    <ul className='mx-40 my-10'>
      {
        reviews.map(review => {
          return (
            <li key={review.id} className='p-2 border border-black'>
              {review.title}
            </li>
          )
        })
      }
    </ul>
  )
}