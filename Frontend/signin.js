const emailTarget = document.querySelector('#email');
const passwordTarget = document.querySelector('#password');
const repasswordTarget = document.querySelector('#repassword');

const getFieldValues = () => {
  return {
    email: emailTarget.value,
    password: passwordTarget.value,
    repassword: repasswordTarget.value,
  };
};

const signupSubmit = () => {
  const values = getFieldValues();

  fetch('http://localhost:3333/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((err) => {
      alert('Aldaaaa');
    });
};

const UPPER_LETTER = 'ABCDEFGHIKLMNOPQRSTVXYZJUW';
const SPECIALS = '@$%!*#?&.';
const LOWER_LETTER = UPPER_LETTER.toLowerCase();
const NUMBERS = '0123456789';

const passwordCheck = (password, repassword) => {
  let match = false;
  let containsUpper = false;
  let containsLower = false;
  let containsDigit = false;
  let containsChar = false;
  let lengthPassed = false;

  match = password === repassword;
  lengthPassed = password.length >= 8;

  for (const char of password.split('')) {
    if (!containsUpper) containsUpper = UPPER_LETTER.includes(char);
    if (!containsLower) containsLower = LOWER_LETTER.includes(char);
    if (!containsDigit) containsDigit = NUMBERS.includes(char);
    if (!containsChar) containsChar = SPECIALS.includes(char);
  }

  return { match, containsUpper, containsLower, containsDigit, containsChar, lengthPassed };
};

const upperTarget = document.querySelector('#upper');
const lowerTarget = document.querySelector('#lower');
const digitTarget = document.querySelector('#digit');
const charTarget = document.querySelector('#char');
const lengthTarget = document.querySelector('#length');

const passwordInputHandle = () => {
  const { password, repassword } = getFieldValues();
  const passwordInfo = passwordCheck(password, repassword);

  upperTarget.checked = passwordInfo.containsUpper;
  lowerTarget.checked = passwordInfo.containsLower;
  digitTarget.checked = passwordInfo.containsDigit;
};

passwordTarget.addEventListener('input', passwordInputHandle);
repasswordTarget.addEventListener('input', passwordInputHandle);

const toggleBtn = () => {
  const btn = document.querySelector('#btn');
  let disabled = btn.disabled;
  btn.disabled = !disabled;
};
