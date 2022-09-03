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
