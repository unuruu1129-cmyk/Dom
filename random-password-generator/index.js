const passwordLengthRangeInput = document.getElementById("password-length-range-input");
const generatePasswordButton = document.getElementById("generate-password-button");
const passwordLengthOutput = document.getElementById("password-length-output");
const message = document.getElementById("message");
const copyGeneratedPasswordButton = document.getElementById("copy-generated-password");
const showGeneratedPassword = document.getElementById("show-generated-password");
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

const generatePassword = () => {
  let password = "";
  const random = new Uint32Array(1);
  const limit = Math.floor(2 ** 32 / characters.length) * characters.length;
  for (let i = 0; i < Number(passwordLengthRangeInput.value); i++) {
    do {
      crypto.getRandomValues(random);
    } while (random[0] > limit);
    password += characters[random[0] % characters.length];
  }
  showGeneratedPassword.textContent = password;
};
const generatePasswordFromRange = () => {
  generatePassword();
  passwordLengthOutput.textContent = passwordLengthRangeInput.value;
};

const copyGeneratedPassword = () => {
  navigator.clipboard.writeText(showGeneratedPassword.textContent);
  copyGeneratedPasswordButton.textContent = "Copied!";
  message.textContent = "Password copied to clipboard.";
  setTimeout(() => {
    copyGeneratedPasswordButton.textContent = "Copy";
    message.textContent = "Uses letters, numbers, and symbols.";
  }, 1500);
};

copyGeneratedPasswordButton.addEventListener("click", copyGeneratedPassword);
passwordLengthRangeInput.addEventListener("input", generatePasswordFromRange);
generatePasswordButton.addEventListener("click", generatePassword);
generatePassword();
