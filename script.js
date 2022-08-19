let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false
let timeOut = 1500

const currentOperationScreen = document.querySelector(".out")
const currentOperationErrorScreen = document.querySelector(".out-error")
const lastOperationScreen = document.querySelector(".cal")

document.querySelector(".the-buttons").addEventListener("click", (ev) => {
    if (ev.target.classList.contains("digit")) {
        appendNumber(ev.target.innerText)
    } else if (ev.target.classList.contains("arithm")) {
        setOperation(ev.target.innerText)
    } else if (ev.target.classList.contains("enter")) {
        evaluate()
    } else if (ev.target.classList.contains("clear-entry")) {
        deleteNumber()
    } else if (ev.target.classList.contains("clear")) {
        clear()
    } else if (ev.target.classList.contains("decimal-point")) {
        appendPoint()
    }
});

function appendNumber(number) {
    if (currentOperationScreen.innerText === '0' || shouldResetScreen)
        resetScreen()
    currentOperationScreen.innerText += number
}

function resetScreen() {
    currentOperationScreen.innerText = ''
    shouldResetScreen = false
}

function clear() {
    currentOperationScreen.innerText = '0'
    lastOperationScreen.innerText = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function appendPoint() {
    if (shouldResetScreen) resetScreen()
    if (currentOperationScreen.innerText === '')
        currentOperationScreen.innerText = '0'
    if (currentOperationScreen.innerText.includes('.')) return
    currentOperationScreen.innerText += '.'
}

function deleteNumber() {
    currentOperationScreen.innerText = currentOperationScreen.innerText.toString().slice(0, -1)
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.innerText
    currentOperation = operator
    lastOperationScreen.innerText = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function switchZero() {
        currentOperationScreen.classList.toggle('hide')
        currentOperationErrorScreen.classList.toggle('hide')
        currentOperationErrorScreen.textContent = `Error something bad happened`
    setTimeout(() =>{
        currentOperationScreen.classList.toggle('hide')
        currentOperationErrorScreen.classList.toggle('hide')
    },timeOut)  
}


function evaluate() {
    if ((currentOperation === '/' || currentOperation === '%') && currentOperationScreen.innerText === '0') {
        switchZero();
        return
    } else if (currentOperation === '!') {
        currentOperationScreen.innerText = roundResult(operate(currentOperation, firstOperand))
        lastOperationScreen.innerText = `${firstOperand} ${currentOperation} =`
        currentOperation = null
        shouldResetScreen = false
        return
    }
    if (currentOperation === null || shouldResetScreen) return
    if (lastOperationScreen.innerText.includes('remainder')) {
        switchZero();
        clear();
        return
    } 
    secondOperand = currentOperationScreen.innerText
    currentOperationScreen.innerText = roundResult(operate(currentOperation, firstOperand, secondOperand))
    lastOperationScreen.innerText = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function power(a, b) {
    return a ** b
}

function remainder(a, b) {
    let rem = a % b;
    return `${(a - rem) / b} remainder ${rem}`
}

function factorialize(a) {
    a = Number(a)
    if (a === 0 || a === 1)
        return 1;
    for (let i = a - 1; i >= 1; i--) {
        a *= i;
    }
    return a;
}

function roundResult(number) {
    if (currentOperation === '%') {
        return number
    }
    return Math.round(number *1000)/1000
}


function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return substract(a, b)
        case 'x':
            return multiply(a, b)
        case '/':
            return divide(a, b)
        case '^':
            return power(a, b)
        case '%':
            return remainder(a, b)
        case '!': 
            return factorialize(a)
        default:
            return 'Something broke'
    }
}