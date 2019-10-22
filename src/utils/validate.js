export const isEmptyStr = value => {
  if (!value || value.trim().length < 1) {
    return true;
  } else {
    return false;
  }
};

export const isValidEmail = value => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
};
