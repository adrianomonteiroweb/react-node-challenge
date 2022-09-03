import { useEffect, useState } from 'react';

import Button from '../../components/button/Button';
import Input from './LoginComponents/Input';

import './login.css';
import {
  emailValidation,
  enableLoginButton,
  passwordValidation,
} from '../../utils/functions';

export default function Login() {
  const [loginBlocking, setLoginBlocking] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    enableLoginButton(
      emailValidation(emailValue),
      passwordValidation(passwordValue),
      setLoginBlocking
    );
  }, [emailValue, passwordValue]);

  return (
    <div className='login-div'>
      <fieldset>
        <h1 className='login-title'>Login</h1>
        <Input
          className='login-inputEmail'
          value={emailValue}
          id='login_input-email'
          type='email'
          onChange={({ target: { value } }) => setEmailValue(value)}
        />

        <Input
          className='login-inputPassword'
          value={passwordValue}
          id='login_input-password'
          type='password'
          onChange={({ target: { value } }) => setPasswordValue(value)}
        />

        <Button
          text='Login'
          className='login-button'
          type='button'
          id='login_button-login'
          disabled={loginBlocking}
        />
      </fieldset>
    </div>
  );
}
