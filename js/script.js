let CheckBoxes = document.querySelectorAll(".option input");
let copy = document.querySelector(".fa-clipboard");
let generateButton = document.querySelector(".generate");
let range = document.querySelector(".range");
let passwordLength = document.querySelector(".password-length span");
let input = document.querySelector(".password input");
let progress = document.querySelector(".stronger-progress");
let trash = document.querySelector(".fa-trash-can");
let message = document.querySelector(".message");

const characters = {
  lowercase: "abcdefhijklmnopqrstuwxyz",
  uppercase: "ABCDEFHIJKLMNOPQRSTUXYZ",
  numbers: "0123456789",
  symbols: "!#$%^&*()-+",
};

window.addEventListener("load", () => {
  generatePassword();
});

generateButton.addEventListener("click", () => {
  generatePassword();
  updateStrongerProgress();
});

// length password
range.addEventListener("input", () => {
  passwordLength.innerHTML = range.value;
});

// generate new password and add it to input
function generatePassword() {
  let password = "";
  let result = "";

  CheckBoxes.forEach((box) => {
    if (box.checked) {
      password += characters[box.id];
    }
  });

  for (i = 0; i <= passwordLength.textContent; i++) {
    result += password[Math.floor(Math.random() * password.length)];
  }
  input.value = result;
  updateStrongerProgress();
}

// for update the progress
function updateStrongerProgress() {
  let number = 0;
  CheckBoxes.forEach((box) => (box.checked === true ? (number += 25) : false));
  progress.style.background =
    number <= 25 ? "red" : number <= 50 ? "yellow" : "green";
  progress.style.width = `${(number / 100) * 100}%`;
}

// to remove the text input
trash.addEventListener("click", () => {
  input.value = "";
  progress.style.background = "#ddd";
});

// to copy the text input
copy.addEventListener("click", () => {
  var text = input.value;
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
});

CheckBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    generatePassword();
    updateCheckBoxes();
  });
});

// add disabled if the number of checked checkboxes is equal to 1
function updateCheckBoxes() {
  var checkedCount = Array.from(CheckBoxes).filter((box) => box.checked).length;
  CheckBoxes.forEach((box) => {
    box.checked && checkedCount === 1 ? (box.disabled = true) : ``;
  });
}
