import axios from 'axios';
import jwt from 'jwt-decode';

export const enableLoginButton = (
  emailValidation,
  passwordValidation,
  setState
) => {
  if (emailValidation && passwordValidation) {
    setState(false);
  } else {
    setState(true);
  }
};

export const emailValidation = (email) => {
  const regex = /\S+@\S+\.\S+/;

  const isValid = regex.test(email);
  return isValid;
};

export const passwordValidation = (password) => {
  // Minimum eight characters, at least one letter and one number
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const isValid = regex.test(password);

  return isValid;
};

export const redirectFunction = (history, alias) => {
  history.push(alias);
};

const base_url = 'http://localhost:3001';

export const tryToLogin = async (email, password) => {
  try {
    const response = await axios.post(`${base_url}/login`, {
      email,
      password_hash: password,
    });

    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export const tryGetAllData = async (alias) => {
  try {
    const response = await axios.get(`${base_url}/${alias}`);

    return response;
  } catch (error) {
    console.error(error.message);
  }
};

export const tokenDecode = (token) => {
  const tokenResult = jwt(token);

  return tokenResult;
};
