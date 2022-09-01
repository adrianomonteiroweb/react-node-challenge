import Input from './components/Input';

export default function Login() {
  return (
    <div className='Login'>
      <fieldset>
        <h1 className='title'>Login</h1>
        <Input
          className='inputEmail'
          value=''
          id='login_input-email'
          type='email'
        />

        <Input
          className='inputPassword'
          value=''
          id='login_input-password'
          type='password'
        />
      </fieldset>
    </div>
  );
}
