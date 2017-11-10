var coinInput = document.getElementById('coin-input');
var userInput;
var replaceRegex = /[£p]/g; // This will match £ and p so that they can be replaced.
var replaceRegex2 = /[\.]/g; // This will match . so that it can be replaced after
// the correct amount of floating point numbers has been added.
var validateRegex = /^(£|\d*)(\d+)(\d*|\.)(\d*)(\d*|p)$/; // This will make sure the user input is valid.
var remainder = 0;

var coinCount = {
  200: 0,
  100: 0,
  50: 0,
  20: 0,
  10: 0,
  5: 0,
  2: 0,
  1: 0
}

var coinArr = [200, 100, 50, 20, 10, 5, 2, 1];

coinInput.addEventListener('keyup', function(e) {
  document.getElementById('error-div').innerHTML = '';
  userInput = coinInput.value;
  if (e.keyCode === 13 && !validateRegex.test(userInput)) {
    document.getElementById('error-div').innerHTML = 'Sorry, your input was in an invalid format';
  } else if (e.keyCode === 13 && validateRegex.test(userInput)) {
    userInput = reformatInput(userInput);
    resetCount();
    calculate(userInput);
  }
});


function reformatInput(input) {
  input = input.replace(replaceRegex, '');
  input = Number(input);
  input = parseFloat(input)
  input = input.toFixed(2);
  input = input.replace(replaceRegex2, '');
  return input;
}

function calculate(input) {
  for (var i = 0; i < coinArr.length; i++) {
    if (input >= coinArr[i]) {
      remainder = input - coinArr[i];
      coinCount[coinArr[i]]++;
      calculate(remainder);
      return;
    }
  }
  updateTable();
}

function resetCount() {
  for (var key in coinCount) {
    coinCount[key] = 0;
  }
}

function updateTable() {
  document.getElementById('td200').innerHTML = coinCount[200];
  document.getElementById('td100').innerHTML = coinCount[100];
  document.getElementById('td50').innerHTML = coinCount[50];
  document.getElementById('td20').innerHTML = coinCount[20];
  document.getElementById('td10').innerHTML = coinCount[10];
  document.getElementById('td5').innerHTML = coinCount[5];
  document.getElementById('td2').innerHTML = coinCount[2];
  document.getElementById('td1').innerHTML = coinCount[1];
}
