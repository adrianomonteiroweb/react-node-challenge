import Button from '../../components/button/Button';
import Input from './LoginComponents/Input';

import './login.css';

export default function Login() {
  return (
    <div className='login-div'>
      <fieldset>
        <h1 className='login-title'>Login</h1>
        <Input
          className='login-inputEmail'
          value=''
          id='login_input-email'
          type='email'
        />

        <Input
          className='login-inputPassword'
          value=''
          id='login_input-password'
          type='password'
        />

        <Button
          text='Login'
          className='login-button'
          type='button'
          id='login_button-login'
        />
      </fieldset>
    </div>
  );
}
