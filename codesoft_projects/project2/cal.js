
let currentValue = '0';
let previousValue = '';
let operator = null;

const display = document.getElementById('display');

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const number = button.dataset.number;

        if (number !== undefined) {
            handleNumber(number);
        } else if (action !== undefined) {
            handleAction(action);
        }

        updateDisplay();
    });
});

function handleNumber(number) {
    if (currentValue === '0') {
        currentValue = number;
    } else {
        currentValue += number;
    }
}


function handleAction(action) {
    switch (action) {
        case 'clear':
            clearCalculator();
            break;
        case 'decimal':
            addDecimal();
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            setOperator(action);
            break;
        case 'equals':
            calculate();
            break;
    }
}

function clearCalculator() {
    currentValue = '0';
    previousValue = '';
    operator = null;
}

function addDecimal() {
    if (!currentValue.includes('.')) {
        currentValue += '.';
    }
}

function setOperator(action) {
    if (previousValue && currentValue && operator) {
        calculate();
    }
    previousValue = currentValue;
    operator = action;
    currentValue = '0';
}

function calculate() {
    if (!operator || !previousValue) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;

    switch (operator) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                result = 'Error'; 
            } else {
                result = prev / current;
            }
            break;
    }

    currentValue = result.toString();
    operator = null;
    previousValue = '';
}

function updateDisplay() {
    display.textContent = currentValue;
}
