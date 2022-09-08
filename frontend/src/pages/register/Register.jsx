import PhoneInput from 'react-phone-input-2';
import Button from '../../components/buttons/Button';

import Input from '../../components/inputs/Input';

import './register.css';

export default function Register() {
  return (
    <div className='cadastro-div'>
      <fieldset>
        <h1 className='cadastro-title'>Register</h1>
        <Input
          className='cadastro-inputFirstName'
          value=''
          id='cadastro_input-firstName'
          type='text'
        />

        <Input
          className='cadastro-inputLastName'
          value=''
          id='cadastro_input-lastName'
          type='text'
        />

        <Input
          className='cadastro-inputEmail'
          value=''
          id='cadastro_input-email'
          type='email'
        />

        <Input
          className='cadastro-inputPassword'
          value=''
          id='cadastro_input-password'
          type='password'
        />

        <PhoneInput
          country={'br'}
          className='cadastro-inputNumber'
          value=''
          id='cadastro_input-number'
          type='text'
        />

        <Button
          text='Register'
          className='cadastro-button'
          type='button'
          id='cadastro_button-cadastro'
        />
      </fieldset>
    </div>
  );
}
