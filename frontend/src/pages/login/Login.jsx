import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import './login.css';
import history from '../../utils/history';
import {
  emailValidation,
  enableLoginButton,
  passwordValidation,
  tokenDecode,
  tryToLogin,
} from '../../utils/functions';

import Input from '../../components/inputs/Input';
import Button from '../../components/buttons/Button';

export default function Login() {
  const [loginBlocking, setLoginBlocking] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // function redirectRegister() {
  //   <Navigate replace to='/register' />;
  // }

  async function checkPermissionOnThisPage() {
    const userLogin = await tryToLogin(emailValue, passwordValue);

    if (!userLogin) {
      setErrorMessage('Usuário ou senha inválidos.');
    } else {
      const token = tokenDecode(userLogin.data.token);
      localStorage.user = JSON.stringify(userLogin.data);

      if (token.user.role === 'admin') history.push('/dashboard');
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
          onClick={checkPermissionOnThisPage}
        />
      </fieldset>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;
