export const validate = (input, value) => {
  switch (input) {
    case 'password': {
      const passwordRegex =
        /(?=.*[a-z])(?=.*[A-Z])(?=\S)(?=.*[0-9])(?=.*[!@#$%^_&*])([a-zA-Z!@#$%^_&*0-9]{5,})/;
      return passwordRegex.test(value);
    }

    case 'name': {
      const nameRegex = /^[a-zA-Z ]{3,20}$/gm;
      return nameRegex.test(value);
    }

    default:
      break;
  }

  return false;
};
