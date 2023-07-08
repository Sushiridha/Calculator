// Get the calculator display elements
const prevOperandTextElement = document.querySelector('.prevOperand');
const currOperandTextElement = document.querySelector('.currOperand');
const historyElement = document.querySelector('.history');
// Get all the calculator buttons
const numberButtons = document.querySelectorAll('.value');
const operationButtons = document.querySelectorAll('.operation');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');

let prevOperand = '';
let currOperand = '';
let selectedOperation = '';
let history = [];
// Update the calculator display
function updateDisplay() {
  prevOperandTextElement.textContent = prevOperand;
  currOperandTextElement.textContent = currOperand;
}

function updateHistory() {
  historyElement.innerHTML = history.map(entry => `<div>${entry}</div>`).join('');
}

// Add event listeners to number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    currOperand += button.textContent;
    updateDisplay();
  });
});

// Add event listeners to operation buttons
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedOperation = button.textContent;
    prevOperand = currOperand;
    currOperand = '';
    updateDisplay();
  });
});

// Add event listener to clear button
clearButton.addEventListener('click', () => {
  prevOperand = '';
  currOperand = '';
  selectedOperation = '';
  updateDisplay();
});

// Add event listener to equal button
equalButton.addEventListener('click', () => {
  const prev = parseFloat(prevOperand);
  const curr = parseFloat(currOperand);

  if (isNaN(prev) || isNaN(curr)) {
    return;
  }

  let result;
  let operator;
  switch (selectedOperation) {
    case '+':
      result = prev + curr;
      operator= '+';
      break;
    case '-':
      result = prev - curr;
      operator= '-';
      break;
    case '*':
      result = prev * curr;
      operator= '*';
      break;
    case '/':
      result = prev / curr;
      operator= '/';
      break;
    case '%':
      result = prev % curr;
      operator= '%';
      break;
    default:
      return;
  }

  prevOperand = '';
  currOperand = result.toString();
  selectedOperation = '';
  history.unshift(`${prev} ${operator} ${curr} = ${result}`); // Add the operation to the beginning of the history array
  if (history.length > 10) {
    history.pop(); // Remove the oldest operation if the history exceeds 10 entries
  }
  updateDisplay();
  updateHistory();
});

// Initialize the calculator display
updateDisplay();

  
  
  
  