export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{4,20}$/;
  return regex.test(username);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
  return regex.test(password);
};

export const validateFileType = (mimetype) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  return allowedTypes.includes(mimetype);
};
