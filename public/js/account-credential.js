const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const register = document.getElementById("register");
register.disabled = true;

confirmPassword.addEventListener(
  "keyup",
  (input) => {
    validatePassword();
  },
  false
);

password.addEventListener(
  "keyup",
  (input) => {
    validatePassword();
  },
  false
);

const validatePassword = () => {
  if (
    confirmPassword.value === password.value &&
    confirmPassword.value.length >= 4
  ) {
    register.disabled = false;
  } else {
    register.disabled = true;
  }
};
