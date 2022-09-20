// store information in calculator
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        // sets these elements inside of Calculator class
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // clears calculator, don't forget to call it
    clear() {
        this.currentOperandTextElement = '';
        this.previousOperandTextElement = '';
        this.operation = undefined
    }

    delete() {

    }

    // adds number to output section every time user clicks a button
    appendNumber(number) {

    }

    // when a user clicks on an operation
    chooseOperation(operation) {

    }

    // takes values inside calculator and computes(calculates) a single value in output display
    compute() {

    }

    updateDisplay() {

    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

