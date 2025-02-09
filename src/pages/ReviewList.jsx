import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../const.js';
import { Header } from '../components/Header.jsx';

export const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  const displayReviewList = async () => {
    try {
      const res = await axios.get(`${url}/public/books?offset=0`);
      setReviews(res.data);
    } catch (err) {
      console.err(err);
    }
  };

  useEffect(() => {
    displayReviewList();
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1>書籍一覧画面</h1>
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
      </main>
    </>
  )
}