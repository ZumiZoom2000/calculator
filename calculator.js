const buttonsKeyboard = document.querySelectorAll('.keyboard button');
const buttonsOperation = document.querySelectorAll('.buttons button');
let displayInsert = document.querySelector('.inserted-number');
let lastInsert = document.querySelector('.last-result');
let savedResults = document.querySelector('#saved-results');
let trashButton = document.querySelector('#trash');

function operate(xText, yText, operand) {
    let x = Number(xText);
    let y = Number(yText);
    switch (operand) {
        case 'plus':
            lastInsert.innerText = Math.round(((x + y) + Number.EPSILON) * 1000) / 1000;
            displayInsert.innerText = "";
            break;
        case 'minus':
            lastInsert.innerText = Math.round(((x - y) + Number.EPSILON) * 1000) / 1000;
            displayInsert.innerText = "";
            break;
        case 'divide':
            lastInsert.innerText = Math.round(((x / y) + Number.EPSILON) * 1000) / 1000;
            displayInsert.innerText = "";
            break;
        case 'multiply':
            lastInsert.innerText = Math.round(((x * y) + Number.EPSILON) * 1000) / 1000;
            displayInsert.innerText = "";
            break;
        case 'clear':
            addToSaved(lastInsert.innerText);
            lastInsert.innerText = "";
            displayInsert.innerText = "";
            break;
        case 'delete':
            displayInsert.innerText = "";
            break;
        default:
            throw new Error('not known operand')
    }
}

function addToSaved(resultToSave) {
    if (resultToSave) {
        let savedResult = document.createElement('button');
        savedResult.className = 'saved-result';
        savedResult.innerText = resultToSave;
        savedResult.addEventListener('click', event => {
            addToDisplayFromSaved(event.target.innerText)
        });
        savedResults.appendChild(savedResult);
    } else {
        return;
    }
}

function addToDisplayFromSaved(value) {
    displayInsert.innerText = value;
}

function clearSaved() {
    savedResults.innerHTML = '';
}

function addToDisplay(num) {
    let displayText = String(displayInsert.innerText);
    let numToText = String(num);
    displayInsert.innerText = (displayText + numToText);
}

trashButton.addEventListener('click', clearSaved)

for (btn of buttonsOperation) {
    btn.addEventListener('click', (event) => operate(lastInsert.innerText, displayInsert.innerText, event.target.value));
}

for (btn of buttonsKeyboard) {
    btn.addEventListener('click', (event) => addToDisplay(event.target.value))
}