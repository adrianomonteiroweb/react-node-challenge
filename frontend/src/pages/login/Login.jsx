import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import './login.css';

import {
  emailValidation,
  enableLoginButton,
  passwordValidation,
  tokenDecode,
  tryToLogin,
} from '../../utils/functions';

import Input from '../../components/inputs/Input';
import Button from '../../components/buttons/Button';
import { Link, Navigate } from 'react-router-dom';

export default function Login() {
  const [loginBlocking, setLoginBlocking] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [statusNavigate, setStatusNavigate] = useState(false);

  async function checkPermissionOnThisPage() {
    const userLogin = await tryToLogin(emailValue, passwordValue);

    if (!userLogin) {
      setErrorMessage('Usuário ou senha inválidos.');
    } else {
      const token = tokenDecode(userLogin.data.token);
      localStorage.user = JSON.stringify(userLogin.data);

      if (token.user.role === 'admin') setStatusNavigate(true);
    }
  }

  useEffect(() => {
    enableLoginButton(
      emailValidation(emailValue),
      passwordValidation(passwordValue),
      setLoginBlocking
    );
  }, [emailValue, passwordValue]);

  return (
    <div className='login-div'>
      {statusNavigate && <Navigate replace to='/dashboard' />}
      <fieldset>
        <h1 className='login-title'>MyPatients</h1>
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
          onClick={checkPermissionOnThisPage}
        />
        <Link className='register-link' to='/register'>
          Registre-se
        </Link>
        {!errorMessage ? '' : <p className='error-message'>{errorMessage}</p>}
      </fieldset>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;
