let numberOne = 0;
let numberTwo = 0;
let Operand;

const ADD = () => { return Number(numberOne + numberTwo)};
const SUBT = () => { return Number(numberOne - numberTwo)};
const MULT = () => { return Number(numberOne * numberTwo)};
const DIVI = () => { return Number(numberOne / numberTwo)};


let aButton =document.getElementsByTagName("button");

// Loop through all button elements and add a click event listener to each
for (let i = 0; i < aButton.length; i++) {
      aButton[i].addEventListener('click', function() {
        // Access the data-value attribute of the clicked button
        const dataValue = this.getAttribute('data-value');
        console.log(dataValue);
      });
    }