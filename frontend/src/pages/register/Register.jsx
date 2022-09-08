import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import { tryRegisterPatient } from '../../utils/functions';

import './register.css';

export default function Register() {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [numberValue, setNumberValue] = useState('');

  async function registerPatient() {
    const registerResult = await tryRegisterPatient({
      firstName: firstNameValue,
      lastName: lastNameValue,
      email: emailValue,
      password_hash: passwordValue,
      number: numberValue,
    });

    console.log('REGISTER: ', registerResult);
  }

  return (
    <div className='cadastro-div'>
      <fieldset>
        <h1 className='cadastro-title'>Register</h1>
        <Input
          className='cadastro-inputFirstName'
          value={firstNameValue}
          id='cadastro_input-firstName'
          type='text'
          onChange={({ target: { value } }) => setFirstNameValue(value)}
        />

        <Input
          className='cadastro-inputLastName'
          value={lastNameValue}
          id='cadastro_input-lastName'
          type='text'
          onChange={({ target: { value } }) => setLastNameValue(value)}
        />

        <Input
          className='cadastro-inputEmail'
          value={emailValue}
          id='cadastro_input-email'
          type='email'
          onChange={({ target: { value } }) => setEmailValue(value)}
        />

        <Input
          className='cadastro-inputPassword'
          value={passwordValue}
          id='cadastro_input-password'
          type='password'
          onChange={({ target: { value } }) => setPasswordValue(value)}
        />

        <PhoneInput
          country={'br'}
          className='cadastro-inputNumber'
          value={numberValue}
          id='cadastro_input-number'
          type='text'
          onChange={(value) => setNumberValue(value)}
        />

        <Button
          text='Register'
          className='cadastro-button'
          type='button'
          id='cadastro_button-cadastro'
          onClick={registerPatient}
        />
      </fieldset>
    </div>
  );
}
