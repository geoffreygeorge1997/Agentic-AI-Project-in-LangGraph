// Calculator script
// Element references
const display = document.getElementById('display');
const keypad = document.querySelector('.keypad');

// Calculator state
let calculatorState = {
  currentInput: '', // what is shown / being typed
  previousValue: null, // stored numeric value before an operator
  operator: null, // '+', '-', '*', '/'
  resetNext: false // flag to clear input on next digit entry
};

// ---------- Core Functions ----------
/**
 * Append a digit or decimal point to the current input.
 * Prevent multiple decimals.
 */
function appendDigit(digit) {
  if (calculatorState.resetNext) {
    calculatorState.currentInput = '';
    calculatorState.resetNext = false;
  }
  // Prevent leading zeros (except "0." case)
  if (digit === '0' && calculatorState.currentInput === '0') return;
  if (digit === '.' && calculatorState.currentInput.includes('.')) return;
  // If starting fresh, avoid leading zeros like "00"
  if (calculatorState.currentInput === '' && digit === '.') {
    calculatorState.currentInput = '0.';
    return;
  }
  calculatorState.currentInput += digit;
}

/**
 * Set the operator for the next calculation.
 */
function setOperator(op) {
  // If we already have a pending operation, compute it first
  if (calculatorState.operator && calculatorState.previousValue !== null && calculatorState.currentInput !== '') {
    calculate();
  }
  // Store the current number as previousValue if not already stored
  if (calculatorState.previousValue === null && calculatorState.currentInput !== '') {
    calculatorState.previousValue = parseFloat(calculatorState.currentInput);
  }
  calculatorState.operator = op;
  calculatorState.resetNext = true;
}

/**
 * Perform the pending arithmetic operation.
 */
function calculate() {
  const a = calculatorState.previousValue;
  const b = parseFloat(calculatorState.currentInput);
  if (a === null || calculatorState.operator === null || isNaN(b)) {
    return; // nothing to calculate
  }
  let result;
  switch (calculatorState.operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      if (b === 0) {
        result = 'Error';
      } else {
        result = a / b;
      }
      break;
    default:
      return;
  }
  // Store result for possible further chaining
  calculatorState.previousValue = typeof result === 'number' ? result : null;
  calculatorState.currentInput = typeof result === 'number' ? String(result) : result;
  calculatorState.operator = null;
  calculatorState.resetNext = true;
}

/**
 * Reset the calculator to its initial state.
 */
function clearAll() {
  // Reset fields without losing the original object reference
  calculatorState.currentInput = '';
  calculatorState.previousValue = null;
  calculatorState.operator = null;
  calculatorState.resetNext = false;
  updateDisplay();
}

/**
 * Remove the last character from the current input.
 */
function backspace() {
  if (calculatorState.resetNext) {
    // If we were waiting for a new number, just clear the flag.
    calculatorState.resetNext = false;
    return;
  }
  calculatorState.currentInput = calculatorState.currentInput.slice(0, -1);
}

/**
 * Render the current input (or result) to the display.
 * Limits length to avoid overflow and adds a simple scroll effect.
 */
function updateDisplay() {
  let text = calculatorState.currentInput || '0';
  const maxLen = 16; // arbitrary limit for readability
  if (text.length > maxLen) {
    // Show the last characters (most recent input)
    text = text.slice(-maxLen);
  }
  display.textContent = text;
}

// ---------- Button Press Dispatcher ----------
/**
 * Central handler for both click and keyboard input.
 */
function handleButtonPress(key) {
  switch (key) {
    case '0': case '1': case '2': case '3': case '4':
    case '5': case '6': case '7': case '8': case '9':
    case '.':
      appendDigit(key);
      break;
    case '+': case '-': case '*': case '/':
      setOperator(key);
      break;
    case '=':
      calculate();
      break;
    case 'C':
      clearAll();
      break;
    case '←':
      backspace();
      break;
    default:
      // ignore unknown keys
      return;
  }
  updateDisplay();
}

// ---------- Event Listeners ----------
// Click handling using event delegation
if (keypad) {
  keypad.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.dataset.key) return; // ignore clicks outside buttons
    const key = target.dataset.key;
    handleButtonPress(key);
  });
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const keyMap = {
    'Enter': '=',
    '=': '=',
    'Backspace': '←',
    'Escape': 'C',
    'c': 'C',
    'C': 'C'
  };
  let mapped = null;
  if (/[0-9]/.test(e.key)) {
    mapped = e.key;
  } else if (['.', '+', '-', '*', '/'].includes(e.key)) {
    mapped = e.key;
  } else if (keyMap[e.key] !== undefined) {
    mapped = keyMap[e.key];
  }
  if (mapped) {
    e.preventDefault();
    handleButtonPress(mapped);
  }
});

// Expose functions for potential unit testing (optional)
window.calculator = {
  state: calculatorState,
  appendDigit,
  setOperator,
  calculate,
  clearAll,
  backspace,
  updateDisplay,
  handleButtonPress
};

// Initial display
updateDisplay();
