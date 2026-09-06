let display = document.getElementById("display");

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

    if (type == "sqrt")
        display.value = Math.sqrt(value);

    else if (type == "square")
        display.value = value * value;

    else if (type == "sin")
        display.value = Math.sin(value * Math.PI / 180);

    else if (type == "cos")
        display.value = Math.cos(value * Math.PI / 180);

    else if (type == "tan")
        display.value = Math.tan(value * Math.PI / 180);

    else if (type == "log")
        display.value = Math.log10(value);

    else if (type == "ln")
        display.value = Math.log(value);

    else if (type == "pi")
        display.value = Math.PI;

    else if (type == "power")
        display.value = Math.pow(value, 2);

    else if (type == "factorial") {
        let fact = 1;
        for (let i = 1; i <= value; i++)
            fact *= i;
        display.value = fact;
    }

    else if (type == "equal") {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = "Error";
        }
    }
}