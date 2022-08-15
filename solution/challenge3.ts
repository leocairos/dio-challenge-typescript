let updateButton = document.getElementById('update-balance');
let clearButton = document.getElementById('clear-balance')!;
let sum = document.getElementById('sum')! as HTMLInputElement;
let balanceField = document.getElementById('field-balance');

let totalBalance = 0

clearBalance()

function addToBalance(value: number) {
    if (balanceField) {
        totalBalance += value
        balanceField.innerHTML = totalBalance.toString();
        clearBalanceField();
    }
}

function clearBalanceField() {
    sum.value = "";
}

function clearBalance() {
    if (balanceField) {
        totalBalance = 0;
        balanceField.innerHTML = totalBalance.toString();
    }
}

if (updateButton) {
    updateButton.addEventListener('click', () => {
        addToBalance(Number(sum.value)); 
    });
}
clearButton.addEventListener('click', () => { 
    clearBalance();
});

/**
    <h4>Value to add: <input id="sum"> </h4>
    <button id="update-balance">Update balance</button>
    <button id="clear-balance">Clear balance</button>
    <h1>"Your balance is: " <span id="field-balance"></span></h1>
 */