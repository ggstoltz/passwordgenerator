// Dom
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// event listener
clipboard.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    length,
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol
  );
});

// generate password

function generatePassword(upper, lower, number, symbol, length) {
  let generatePassword = " ";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => {
      return Object.values(item)[0];
    }
  );

  if (typesCount === 0) {
    return " ";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatePassword.slice(0, length);

  return finalPassword;
}

// functions password input http://www.net-comber.com/charset.html
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*-_.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
