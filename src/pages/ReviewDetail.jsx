import { useEffect, useState } from "react"
import axios from "axios";
import { Link, useParams } from 'react-router';
import { useSelector } from "react-redux";
import { url } from '../const.js';
import { Header } from "../components/Header.jsx";
import './ReviewDetail.scss';

export const ReviewDetail = () => {
  const token = useSelector((state) => state.token.value);
  const headers = { 'Authorization': `Bearer ${token}` };
  const { review_id } = useParams();
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchReview = async () => {
    try {
      const res = await axios.get(`${url}/books/${review_id}`, { headers: headers });
      setReview(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      const timeoutId = setTimeout(() => setLoading(false), 1000);  // ロード時間が短くて確認しにくいので1秒プラス
      return () => clearTimeout(timeoutId); // アンマウント時にクリーンアップ
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Header />
        <main>
          <h1>書籍レビュー詳細画面</h1>
          <div className="review-container m-10 p-5 text-left border border-black bg-sky-50">

            <p className="text-xl font-bold my-3">{review.title}</p>

            <div className="my-2">
              <span>URL：</span><Link to={review.url}>{review.url}</Link>
            </div>

            <div className="my-2">
              <p>{`レビュワー：${review.reviewer}`}</p>
            </div>
            
            <div className="my-2">
              <p className="font-bold">詳細</p>
              <p>{review.detail}</p>
            </div>

            <div className="my-2">
              <p className="font-bold">レビュー</p>
              <p>{review.review}</p>
            </div>
          </div>
          <Link to='/reviewList'>一覧画面に戻る</Link>
        </main>
      </>
    )
  };
};