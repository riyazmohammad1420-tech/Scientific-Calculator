let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

function add(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate(type) {

    let value = parseFloat(display.value);
    let old = display.value;
    let result;

    if (type == "sqrt")
        result = Math.sqrt(value);

    else if (type == "square")
        result = value * value;

    else if (type == "sin")
        result = Math.sin(value * Math.PI / 180);

    else if (type == "cos")
        result = Math.cos(value * Math.PI / 180);

    else if (type == "tan")
        result = Math.tan(value * Math.PI / 180);

    else if (type == "log")
        result = Math.log10(value);

    else if (type == "ln")
        result = Math.log(value);

    else if (type == "pi")
        result = Math.PI;

    else if (type == "power")
        result = Math.pow(value, 2);

    else if (type == "factorial") {

        if (value < 0 || !Number.isInteger(value)) {
            display.value = "Error";
            return;
        }

        result = 1;

        for (let i = 1; i <= value; i++)
            result *= i;
    }

    else if (type == "equal") {

        try {
            result = eval(display.value);
        }

        catch {
            display.value = "Error";
            return;
        }
    }

    display.value = result;
    addHistory(old + " = " + result);
}

/* History */

function addHistory(text) {

    if (text.includes("undefined") || text.includes("NaN"))
        return;

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.unshift(text);

    if (history.length > 10)
        history.pop();

    localStorage.setItem("history", JSON.stringify(history));

    showHistory();
}

function showHistory() {

    let history = JSON.parse(localStorage.getItem("history")) || [];

    if (history.length == 0) {
        historyList.innerHTML = "<p>No calculations yet.</p>";
        return;
    }

    historyList.innerHTML = history
        .map(item => `<div class="history-item">${item}</div>`)
        .join("");
}

function clearHistory() {
    localStorage.removeItem("history");
    showHistory();
}

/* Dark / Light mode */

document.getElementById("theme").onclick = function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark"))
        this.textContent = "☀️";
    else
        this.textContent = "🌙";
};

/* Keyboard support */

document.addEventListener("keydown", function(event) {

    let key = event.key;

    if ("0123456789.+-*/".includes(key)) {
        add(key);
    }

    else if (key == "Enter") {
        calculate("equal");
    }

    else if (key == "Backspace") {
        backspace();
    }

    else if (key == "Escape") {
        clearDisplay();
    }

    else if (key == "^") {
        calculate("power");
    }
});

/* Load history */

showHistory();
