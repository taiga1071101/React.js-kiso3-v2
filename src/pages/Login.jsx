import React, { use, useState } from 'react';
import { Header } from '../components/Header.jsx';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({email: '', password: ''});
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onLogin = (e) => {
    e.preventDefault();

    let valid = true;
    let errors = {email: '', password: ''};

    if (!email) {
      errors.email = 'メールアドレスを入力してください。'
      valid = false;
    } else if (!email.includes('@')) {
      errors.email = "有効なメールアドレスを入力してください。";
      valid = false;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-/:-@[-`{-~]).{8,}$/;  // ?=で後続する文字列が一致するか確認。.*は任意の位置を探索可能に。
    if (!password) {
      errors.password = 'パスワードを入力してください。';
      valid = false;
    } else if (!regex.test(password)) {
      errors.password = 'パスワードは8文字以上で、大文字小文字の英数記号を全て含んでください。';
      valid = false;
    }
    setErrorMessage(errors);
  };

  return (
    <>
      <Header />
      <main>
        <h1>ログイン画面</h1>
        <form onSubmit={onLogin} noValidate>
          <div className='m-5'>
            <label>メールアドレス</label>
            <input type='email' value={email} onChange={handleEmailChange} />
            <p id='email-error'>{errorMessage.email}</p>
          </div>

          <div>
            <label>パスワード</label>
            <input type='password' value={password} onChange={handlePasswordChange} />
            <p id='password-error'>{errorMessage.password}</p>
          </div>

          <button type='submit' id='login-button'>ログイン</button>
        </form>
      </main>
    </>
  )
}