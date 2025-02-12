import React, { useState } from 'react';
import axios from 'axios';
import Compressor from "compressorjs";
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router';
import { url } from '../const';
import { Header } from '../components/Header.jsx';

export const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignUp = async (data) => {
    const { name, email, password, icon } = data;
    const requestData = { name, email, password };

    try {
      const res = await axios.post(`${url}/users`, requestData);
      console.log('サインアップに成功しました。', res);

      const file = await FileCompression(icon[0]);
      console.log('圧縮に成功しました。', file);

      await OnIconUpload(res.data.token, file);
    } catch (err) {
      setErrorMessage(`${err.response?.data?.ErrorMessageJP || `サインアップ中にエラーが発生しました。 ${err}`}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ファイルサイズ圧縮
  const FileCompression = (file) => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        maxWidth: 100,
        maxHeight: 100,
        mimeType: 'image/jpg',
        success (result) {
          resolve(result);
        },
        error (err) {
          reject(`ファイルサイズ圧縮エラー：${err}`);
        }
      });
    });
  };

  // アイコンアップロード
  const OnIconUpload = async (token, file) => {
    try {
      // 圧縮結果をAPIで送信できるようにFormDataに変換
      const formData = new FormData();
      formData.append('icon', file);

      const headers = { 'Authorization': `Bearer ${token}` };
      const res = await axios.post(`${url}/uploads`, formData, { headers: headers});
      console.log('アップロードに成功しました。', res);
    } catch (err) {
      setErrorMessage(`${err.response?.data?.ErrorMessageJP || `画像アップロード中にエラーが発生しました。 ${err}`}`);
    }
  };

  return (
    <>
      <Header />
      <main>
        <h1>新規登録画面</h1>
        <p>{errorMessage}</p>
        <form onSubmit={handleSubmit(onSignUp)}>
          <div className='mx-100 text-left'>
            <div>
              <label>ユーザ名</label>
              <input 
                type="text"
                {...register("name", {
                  required: "ユーザー名を入力してください。"
                })}
              />
              <p className="error-message">{errors.name?.message}</p>
            </div>

            <div>
              <label>ユーザアイコン</label>
              <input
                type="file"
                accept="image/*"
                {...register("icon", {
                  required: "アイコンを選択してください。"
                })}
              />
              <p className="error-message">{errors.icon?.message}</p>
            </div>

            <div>
              <label>メールアドレス</label>
              <input
                type="email"
                {...register("email", {
                  required: "メールアドレスを入力してください。",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "有効なメールアドレスを入力してください。",
                  },
                })}
              />
              <p className="error-message">{errors.email?.message}</p>
            </div>

            <div>
              <label>パスワード</label>
              <input
                type="password"
                {...register("password", {
                  required: "パスワードを入力してください。",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-/:-@[-`{-~]).{8,}$/,
                    message: "パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください。",
                  },
                })}
              />
              <br />
              <p className="error-message">{errors.password?.message}</p>
            </div>
          </div>

          <button type='submit' disabled={isSubmitting} >新規登録</button>
        </form>
        <Link to='/login'>ログイン画面へ</Link>
      </main>
    </>
  )
}