// store information in calculator
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        // sets these elements inside of Calculator class
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // clears calculator, don't forget to call it in the Calculator class
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined
    }

    // deletes one number at a time when user clicks 'del'
    delete() {
        // slice will start at the front (0) and take off the last number (-1)
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // appends(add) number to output section every time user clicks a button
    appendNumber(number) {
        // only allows user to use '.' once
        if(number === '.' && this.currentOperand.includes('.')) return;
        // makes it a string '1' + '1' = '11' rather than adding 1 + 1 = 2
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // when a user clicks on an operation, it moves operation to top row
    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        // if prev operand already exists, it will compute before moving on 
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // takes values inside calculator and computes(calculates) a single value in output display
    compute() {
        let computation;
        // parseFloat converts string into number
        const prev = parseFloat(this.previousOperand);
        const current =parseFloat(this.currentOperand);
        // if there's no prev or current value (is Not a Number), return and cancel funtion
        if(isNaN(prev) || isNaN(current)) return;
        // creates multiple 'if' statements
        switch(this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;     
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    // displays commas and decimals in display as needed
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // updates display to current operand of user choice
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
            // displays operation along with the prev operand when user clicks
            if(this.operation != null) {
                this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
            } else {
                this.previousOperandTextElement.innerText = '';
            }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

// define class by using 'new' followed by the class name
// pass everything from constructor into class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// displays number of which ever button is clicked by user
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

// passes user operation selection into display
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

// computes user selections and updates display
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

// clears display when user clicks 'AC'
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
