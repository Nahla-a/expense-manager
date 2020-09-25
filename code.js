const EXPENSE_KEY = "expenseList";
getExpenseDataFromLocalStorage();
deleteTempRow();


let addItemButton = document.getElementById("addElementButton");
addItemButton.addEventListener("click", function () {
    let typeOfExpense = document.getElementById("typeBox");
    let nameOfExpense = document.getElementById("nameBox");
    let dateOfExpense = document.getElementById("dateBox");
    let amountOfExpense = document.getElementById("amountBox");

    if (typeOfExpense.value == "--") {
        alert("plz select a proper type of expense")
    }
    else if (nameOfExpense.value == "") {
        alert("plz enter a name of expense")
    }
    else if (dateOfExpense.value == "") {
        alert("plz pick up a date from the calender")
    }
    else if (amountOfExpense.value == 0) {
        alert("the amount should be greater than 0")
    }
    else {
        addExpenseToTable(typeOfExpense.value, nameOfExpense.value, dateOfExpense.value, amountOfExpense.value);
        storeExpenseDataToLocalStorage(typeOfExpense, nameOfExpense, dateOfExpense, amountOfExpense);
        clearInputText();

    }


})

function addExpenseToTable(type, name, date, amount) {
    let table = document.getElementById("expenseTable");
    let newRow = table.insertRow();
    let cell1 = newRow.insertCell();
    let cell2 = newRow.insertCell();
    let cell3 = newRow.insertCell();
    let cell4 = newRow.insertCell();
    let cell5 = newRow.insertCell();

    cell1.innerHTML = type;
    cell2.innerHTML = name;
    cell3.innerHTML = date;
    cell4.innerHTML = amount;

    let clearButton = document.createElement("button");
    clearButton.innerHTML = "clear";
    cell5.appendChild(clearButton);

    clearButton.addEventListener("click", (e) => {
        // let theType, theName, theDate, theAmount;
        e.preventDefault();
        let clear = e.target.parentElement.parentElement;
        e.target.parentElement.parentElement.remove();

            // let expenseList = localStorage.getItem(EXPENSE_KEY)
            // expenseList = JSON.parse(expenseList);
            // let expenseItems = []
            // for (i = 0; i < expenseList.length; i++) {
            //     if (expenseList[i].theType && expenseList[i].theName && expenseList[i].theDate && expenseList[i].theAmount !== clear) {
            //         expenseItems.push(expenseList[i])
            //     }
            // }
            // localStorage.setItem(EXPENSE_KEY, JSON.stringify(theType, theName, theDate, theAmount))

    });
}




    function deleteTempRow() {
        let tempRow = document.getElementById("tempRow");
        if (tempRow != null) {
            tempRow.parentNode.removeChild(tempRow);
        }
    }

    function clearInputText() {
        document.getElementById("typeBox").value = "";
        document.getElementById("nameBox").value = "";
        document.getElementById("dateBox").value = "";
        document.getElementById("amountBox").value = "";
    }

    function storeExpenseDataToLocalStorage(typeOfExpense, nameOfExpense, dateOfExpense, amountOfExpense) {
        let expenseLocalStorage = localStorage.getItem(EXPENSE_KEY);
        if (expenseLocalStorage == null) {
            expenseLocalStorage = [];
        } else {
            expenseLocalStorage = JSON.parse(expenseLocalStorage);
        }
        expenseLocalStorage.push({ theType: typeOfExpense.value, theName: nameOfExpense.value, theDate: dateOfExpense.value, theAmount: amountOfExpense.value });
        localStorage.setItem(EXPENSE_KEY, JSON.stringify(expenseLocalStorage));
    }

    function getExpenseDataFromLocalStorage() {
        let expenseLocalStorage = localStorage.getItem(EXPENSE_KEY);
        if (expenseLocalStorage !== null) {
            expenseLocalStorage = JSON.parse(expenseLocalStorage);
            for (i = 0; i < expenseLocalStorage.length; i++) {
                type = expenseLocalStorage[i].theType;
                name = expenseLocalStorage[i].theName;
                date = expenseLocalStorage[i].theDate;
                amount = expenseLocalStorage[i].theAmount;

                addExpenseToTable(type, name, date, amount);


            }
        }

    }