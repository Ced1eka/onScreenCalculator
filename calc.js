const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = document.querySelector(".calculator__display");

const calculate = (n1, operator, n2) => {
const firstNum = parseFloat(n1)
const secondNum = parseFloat(n2)
if (operator === 'add') return firstNum + secondNum
if (operator === 'subtract') return firstNum - secondNum
if (operator === 'divide') return firstNum / secondNum
if (operator === 'multiply') return firstNum * secondNum
}

const getKeyType = (key) => {
  const { action } = key.dataset
  if (!action) return 'number'
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) return 'operator'
  // For everything else, return the action
  return action
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(key)
  calculator.dataset.previousKeyType = keyType


  if (keyType === 'operator') {
    key.classList.add('is-depressed')
    calculator.dataset.operator = key.dataset.action
    calculator.dataset.firstValue = firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
    ? calculatedValue
    : displayedNum
  }


  if (keyType === 'clear') {

    if (key.textContent === 'AC') {
      calculator.dataset.firstValue = ''
      calculator.dataset.modValue = ''
      calculator.dataset.operator = ''
      calculator.dataset.previousKeyType = ''
    } else {
      key.textContent = 'AC'
    }
  }

  if (keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
    }

  if (keyType === 'calculate') {
    calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
    ? modValue
    : displayedNum
  }

  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
}

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key)
  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

  if (keyType === 'operator') key.classList.add('is-depressed')

  if (keyType === 'clear' && key.textContent !== 'AC') {
    key.textContent = 'AC'
  }

  if (keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
}


const createResultString = (key,displayedNum,state) => {
  const keyContent = key.textContent;
  const action = key.dataset.action;
  const firstVal = state.firstVal
  const modVal = state.modVal
  const operator = state.operator
  const previousKeyType = calculator.dataset.previousKeyType;
  const keyType = getKeyType(key)
  if (keyType === 'number') {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes(".")) return displayedNum + "."
    if (previousKeyType === "operator" || previousKeyType === 'calculate') return "0."
    return displayedNum
  }

  if (keyType === 'operator') {
    const firstVal = calculator.dataset.firstVal;
    const operator = calculator.dataset.operator;


     return firstVal &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
      ? calculate(firstVal, operator, secondVal)
      : displayedNum
  }

  if (keyType === 'clear') return 0

  if (keyType === 'calculate'){
    const firstVal = calculator.dataset.firstVal
    const operator = calculator.dataset.operator
    const modVal = calculator.dataset.modVal
    if(firstVal){
      return previousKeyType === 'calculate'
      ? calculate(displayedNum,operator,modVal)
      : calculate(firstVal,operator,displayedNum)
  } else {
    return displayedNum
  }


}
}
keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {

    const key = e.target
    const displayedNum = display.textContent

    const resultString = createResultString(key,displayedNum,calculator.dataset)

    display.textContent =resultString
    updateCalculatorState(key,calculator,resultString,displayedNum)

    updateVisualState(key, calculator)
  }
});
