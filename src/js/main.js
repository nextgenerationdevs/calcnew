var numA = 0,
    numB,
    opeR = null,
    res,
    display = document.getElementById("txt1"),
    count = 0,
    flag = false;

document.getElementById("btn7").addEventListener("click", function() {
    pressNum(7);
});

function pressNum(value) {
    if (flag == true) {
        clean();
    }

    if (value === ".") {
        if (count == 0) {
            count = 1;
        }
    }
    else {
        var tmp = +value;
        if (opeR == null) {
            if (count == 0) {
                numA = numA*10 + tmp;
            }
            else {
                numA = numA + tmp / Math.pow(10, count);
                count++;
            }
            display.value = numA;
        }
        else {
            if (numB == null) {
                numB = 0;
            }
            if (count == 0) {
                numB = numB*10 + tmp;
            }
            else {
                numB = numB + tmp / Math.pow(10, count);
                count++;
            }
            display.value = numB;
        }
    }

}

function operation(oper) {
    if (opeR != null) {
        if (oper == "=") {
            if (numB == null) {
                numB = numA;
            }
        }
        if (opeR == "/" && numB == 0) {
            blockedOperations(true);
        }
        else {
            calc();
            display.value = res;
            numA = res;
        }
        if (oper != "=") {
            opeR = oper;
            count = 0;
        }
        numB = null;
    }
    else {
        if (oper != "=" && oper != "%") {
            opeR = oper;
            count = 0;
        }
        numB = null;
    }
}

function calc() {
    switch (opeR) {
        case "+": res = numA + numB; break;
        case "-": res = numA - numB; break;
        case "*": res = numA * numB; break;
        case "/": res = numA / numB; break;
    }
}

function calcPercent() {
    if (numB == null) {
        numB = 1;
        numA = numB * (numA / 100);
        display.value = numA;
    }
    else {
        numB = numB * (numA / 100);
        display.value = numB;
    }
}

function clean() {
    res = 0;
    numA = 0;
    numB = null;
    opeR = null;
    count = 0;
    display.value = res;
    blockedOperations(false);
}

function blockedOperations(val) {
    var array = ["btnPlus", "btnMinus", "btnMultiply", "btnDivide"];
    flag = val;
    if (flag) {
        display.value = "Error";
        for (let i = 0; i < array.length; i++) {
            document.getElementById(array[i]).disabled = flag;
        }
    }
    else {
        for (let i = 0; i < array.length; i++) {
            document.getElementById(array[i]).disabled = flag;
        }
    }
}

function backspace() {
    if (opeR == null) {
        if (numA % parseInt(numA) > 0) {
            for (let i = 0; i < count-2; i++) {
                numA *= 10;
            }
            numA = parseInt(numA);
            for (let i = 0; i < count-2; i++) {
                numA /= 10;
            }
            count--;
        }
        else {
            numA = parseInt(numA / 10);
        }
        display.value = numA;
    }
    else {
        if (numB % parseInt(numB) > 0) {
            for (let i = 0; i < count-2; i++) {
                numB *= 10;
            }
            numB = parseInt(numB);
            for (let i = 0; i < count-2; i++) {
                numB /= 10;
            }
            count--;
        }
        else {
            numB = parseInt(numB / 10);
        }
        display.value = numB;
    }
}

function cancel() {
    numB = 0;
    display.value = numB;
}