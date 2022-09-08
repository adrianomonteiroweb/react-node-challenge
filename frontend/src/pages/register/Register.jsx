import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';

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
  const [statusRegister, setStatusRegister] = useState(null);

  function clearFields() {
    document.querySelectorAll('input').forEach((cad) => (cad.value = ''));
  }

  async function registerPatient() {
    const registerResult = await tryRegisterPatient(
      {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        password_hash: passwordValue,
        number: numberValue,
      },
      'user'
    );

    if (registerResult) {
      setStatusRegister('Registration Successful');

      clearFields();
    }
  }

  return (
    <div className='cadastro-div'>
      <fieldset>
        <h1 className='cadastro-title'>Register</h1>
        <Input
          className='cadastro-inputFirstName .cad'
          value={firstNameValue}
          id='cadastro_input-firstName'
          type='text'
          onChange={({ target: { value } }) => setFirstNameValue(value)}
        />

        <Input
          className='cadastro-inputLastName .cad'
          value={lastNameValue}
          id='cadastro_input-lastName'
          type='text'
          onChange={({ target: { value } }) => setLastNameValue(value)}
        />

        <Input
          className='cadastro-inputEmail .cad'
          value={emailValue}
          id='cadastro_input-email'
          type='email'
          onChange={({ target: { value } }) => setEmailValue(value)}
        />

        <Input
          className='cadastro-inputPassword .cad'
          value={passwordValue}
          id='cadastro_input-password'
          type='password'
          onChange={({ target: { value } }) => setPasswordValue(value)}
        />

        <PhoneInput
          country={'br'}
          className='cadastro-inputNumber .cad'
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

        {!statusRegister ? (
          ''
        ) : (
          <div className='infos-register'>
            <p>{statusRegister}</p>
            <Link className='back' to='/dashboard'>
              Back
            </Link>
          </div>
        )}
      </fieldset>
    </div>
  );
}
