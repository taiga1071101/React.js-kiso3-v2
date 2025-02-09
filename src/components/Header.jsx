import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { url } from '../const';
import './header.scss';

export const Header = () => {
  const token = useSelector((state) => state.token.value);
  const [userName, setUserName] = useState('');

  const fetcUserName = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      const res = await axios.get(`${url}/users`, { headers: headers});
      setUserName(res.data.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token.length > 0) fetcUserName();
  }, [token]);

  return (
    <header>
      <p>書籍レビューアプリ</p>
      {
        token ? (
          <div>
            <p>{`${userName} さん`}</p>
            <Link to='/profile'>ユーザー情報編集</Link>
          </div>
        ) : (
          <Link to='/login'>ログイン</Link>
        )
      }
    </header>
  );
};