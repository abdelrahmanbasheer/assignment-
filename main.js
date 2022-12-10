let currentNum = "";
let previousNum = "";
let sign = "";
 let answerShown=false
let currentDisplayNumber = document.querySelector(".currentNumber");
let previousDisplayNumber = document.querySelector(".previousNumber");

window.addEventListener("keydown", handleKeyPress);

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  if (currentNum !== "" && previousNum !== "") {
    compute();
  }else if(currentNum !=="" && previousNum =="" &&sign===""){
    currentDisplayNumber.textContent = currentNum;
  }
  else{
  currentDisplayNumber.textContent = "Empty Calculation !";
  setTimeout(() => {
    currentDisplayNumber.textContent = 0;
  }, 2000);
}
});

const fullAnswer=document.querySelector(".ans")
fullAnswer.addEventListener("click",showAll)
const clear = document.querySelector(".clear");
clear.addEventListener("click", clearAll);

const numberButtons = document.querySelectorAll(".number");
const signs = document.querySelectorAll(".sign");

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {
  if (previousNum !== "" && currentNum !== "" && sign === "") {
    previousNum = "";
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum.length <= 11) {
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
  }
}

signs.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleSign(e.target.textContent);
  });
});

function handleSign(fig) {
  if (previousNum === "") {
    previousNum = currentNum;
    signCheck(fig);
  } else if (currentNum === "") {
    signCheck(fig);
  } else {
    compute();
    sign = fig;
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = previousNum + " " + sign;
  }
}

function signCheck(fig) {
  sign = fig;
  previousDisplayNumber.textContent = previousNum + " " + sign;
  currentDisplayNumber.textContent = "0";
  currentNum = "";
}

function compute() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);
  if (sign === "+") {
    previousNum += currentNum;
  } else if (sign === "-") {
    previousNum -= currentNum;
  } else if (sign === "x") {
    previousNum *= currentNum;
  } else if (sign === "/") {
    if (currentNum <= 0) {
      previousNum = "NaN";
      displayResults();
      setTimeout(() => {
        currentDisplayNumber.textContent = 0;
      }, 2000);
    }
    previousNum /= currentNum;
  }
  previousNum = previousNum.toString();
  displayResults();
}
function displayResults() {
  if (previousNum.length <= 11) {
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
  }
  previousDisplayNumber.textContent = "";
  sign = "";
  currentNum = "";
}

function showAll(){
  if(answerShown!=true){
    currentDisplayNumber.textContent = previousNum
    answerShown=true
}else{
  currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
  answerShown=false
}
}
function clearAll() {
  currentNum = "";
  previousNum = "";
  sign = "";
  currentDisplayNumber.textContent = "0";
  previousDisplayNumber.textContent = "";
}
function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (e.key === "Enter" || e.key === "=") {
    compute();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleSign(e.key);
  }
  if (e.key === "*" || e.key === "x") {
    handleSign("x");
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

function handleDelete() {
  if (currentNum !== "") {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNumber.textContent = currentNum;
    if (currentNum === "") {
      currentDisplayNumber.textContent = "0";
    }
  }
  if (currentNum === "" && previousNum !== "" && sign === "") {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
  }
}
