import React from 'react';
import { increase, decrease } from '../redux/offsetSlice.js';
import { Link } from 'react-router';
import { Header } from '../components/Header.jsx';
import { ReviewContent } from './ReviewContent.jsx';
import { useDispatch, useSelector } from 'react-redux';

export const ReviewList = () => {
  const dispatch = useDispatch();
  const offset = useSelector((state) => state.offset.count);

  const nextList = () => {
    if (offset === 0) return;
    dispatch(decrease());
  }

  const preList = () => dispatch(increase());

  return (
    <>
      <Header />
      <main>
        <h1>書籍一覧画面</h1>
        <ReviewContent />
        <div>
          <button onClick={nextList}>次へ</button>
          <span>{offset + 1}～{offset + 10}</span>
          <button onClick={preList}>前へ</button>
        </div>
        <div>
          <Link to='/new'>書籍レビュー投稿画面へ</Link>
        </div>
      </main>
    </>
  )
}