display = document.getElementById("display"); // Get input element showing on calculator
shiftDisplay = document.getElementById("shift-indicator");
modeDisplay = document.getElementById("mode-indicator");
angleDisplay = document.getElementById("angle-indicator");
val = ""; // Current entry
expression = ""; // Expression to be evaluated
shift = false; // Holds shift value
angle = "deg"; // Holds angle mode
mode = false; // Holds mode value

// TODO: add more operations



function number(num) {
    // Don't insert a number when changing angle mode
    if (!mode) {
        display.value += num;
        val += num;
    }  
}

function shiftToggle() {
    shift = !shift;
    shiftDisplay.textContent = "shift = " + shift;
}

function shiftFalse() {
    shift = false;
    shiftDisplay.textContent = "shift = " + shift;
}

// Called once button released other than shift, to set shift to false and display expression and val.
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    if (button.className != "shift-button") {
        button.addEventListener('mouseup', (event) => {
            //console.log("Mouse released on:", event.target);
            console.log(`${expression}, ${val}`);
            shiftFalse();
        });
    }  
});

// Mode button for changing angle
function modeToggle() {
    mode = !mode;
    modeDisplay.textContent = "mode = " + mode;
}

function modeAct(num) {
    if (mode) {
        switch(num) {
            case '4':
                angle = "deg";
                break;
            case '5':
                angle = "rad";
                break;
            case '6':
                angle = "gra";
                break;
        }
        modeToggle(); // Back to false
    }
    angleDisplay.textContent = "angle = " + angle;
}

function operation(op) {
    expression += val;
    switch(op) {
        case '+':           
            expression += '+';
            break;
        case '-':
            expression += '-';
            break;
        case '*':
            expression += '*';
            break;
        case '/':
            expression += '/';
            break;
    }
    display.value = ""; // Clear display
    val = "";
}

function square() {
    ans = '';
    // Square root
    if (shift) {
        ans = String(Math.sqrt(Number(val)));
    }
    // 2nd power
    else {
        ans = String(Math.pow(Number(val), 2));
    }
    display.value = ans;
    val = ans;
}

function degToRad(num) {
    return num * (Math.PI/180);
}

function graToRad(num) {
    return num * (Math.PI/200);
}

function radToDeg(num) {
    return num * (180/Math.PI);
}

function radToGra(num) {
    return num * (200/Math.PI);
}

function sin() {
    ans = '';
    // sin^-1
    // Math defaults in radians, need to convert
    if (shift) {
        res = Math.asin(Number(val)); // Currently in radians
        if (angle == "deg") {
            ans = String(radToDeg(res));
        }
        else if (angle == "rad") {
            ans = String(res);
        }
        else {
            ans = String(radToGra(res));
        }
    }
    // sin
    else {
        if (angle == "deg") {
            ans = String(Math.sin(degToRad(Number(val))));
        }
        else if (angle == "rad") {
            ans = String(Math.sin(Number(val)));
        }
        else {
            ans = String(Math.sin(graToRad(Number(val))));
        }
    }
    display.value = ans;
    val = ans;
}

function cos() {
    ans = '';
    // cos^-1
    // Math defaults in radians, need to convert
    if (shift) {
        res = Math.acos(Number(val)); // Currently in radians
        if (angle == "deg") {
            ans = String(radToDeg(res));
        }
        else if (angle == "rad") {
            ans = String(res);
        }
        else {
            ans = String(radToGra(res));
        }
    }
    // cos
    else {
        if (angle == "deg") {
            ans = String(Math.cos(degToRad(Number(val))));
        }
        else if (angle == "rad") {
            ans = String(Math.cos(Number(val)));
        }
        else {
            ans = String(Math.cos(graToRad(Number(val))));
        }
    }
    display.value = ans;
    val = ans;
}

function tan() {
    ans = '';
    // tan^-1
    // Math defaults in radians, need to convert
    if (shift) {
        res = Math.atan(Number(val)); // Currently in radians
        if (angle == "deg") {
            ans = String(radToDeg(res));
        }
        else if (angle == "rad") {
            ans = String(res);
        }
        else {
            ans = String(radToGra(res));
        }
    }
    // tan
    else {
        if (angle == "deg") {
            ans = String(Math.tan(degToRad(Number(val))));
        }
        else if (angle == "rad") {
            ans = String(Math.tan(Number(val)));
        }
        else {
            ans = String(Math.tan(graToRad(Number(val))));
        }
    }
    display.value = ans;
    val = ans;
}

// Switch sign of val, or 1/3 root
function pm() {
    if (shift) {
        // 1/3rd power
        val = String(Math.pow(Number(val), 1/3));       
    }
    else {
        // Check if val is nonempty
        if (val.length > 0) {
            if (val[0] == '-') {
                val = val.substring(1); // Remove minus
            }
            else {
                val = '-' + val; // Add minus
            }
        }
    }
    display.value = val;
}

// Evaluate the stored expression
function equals() {
    expression += val;
    ans = eval(expression);
    display.value = String(ans);
    val = String(ans);
    expression = ""; // Reset expression to nothing
}

// Reset currently displayed number
function currentClear() {
    display.value = "";
    val = "";
}

// Reset all variables
function allClear() {
    display.value = "";
    val = "";
    expression = "";
}

// Normal, exp for powers of ten, shift for pi value
function exp() {
    if (shift) {
        display.value += "pi";
        val += Math.PI;
    }
    else {
        display.value = "";
        expression += val + "*10**";
        val = "";
    }
}

// Normal, log10. Shift, 10^x.
function log10() {
    ans = "";
    if (shift) {
        ans = String(Math.pow(10, Number(val)));
    }
    else {
        ans = String(Math.log10(Number(val)));
    }
    val = ans;
    display.value = val;
}

// Normal, ln. Shift, e^x.
function ln() {
    ans = "";
    if (shift) {
        ans = String(Math.pow(Math.E, Number(val)));
    }
    else {
        ans = String(Math.log(Number(val)));
    }
    val = ans;
    display.value = val;
}

// Normal, x^y. Shift, x^1/y
// Possible solution: autocomplete parentheses?
function xPowY() {
    expression += val + "**";
    if (shift) {
        val = "" // TODO: Fix with above solution
    }
    else {
        val = "";
    }
    display.value = "";
}

function trian() {
    ans = "";
    if (shift) {
        ans = String(Math.pow(Number(val), 3));  // 3rd power
    }
    display.value = ans;
    val = ans;
}

function leftPar() {
    count = expression.split("(").length - 1; // Count occurrences of '(' in expression
    if (count < 6) {
        expression += "(";
        display.value = "";
    }   
}

// Normal, right par. Shift 1/x.
function rightPar() {
    if (shift) {
        val = String(1/Number(val));
        display.value = val;
    }
    else {
        // Eval whole expression until left par is reached, search from right to left
        for (let i = expression.length - 1; i >= 0; i--) {
            if (expression.charAt(i) == '(') {
                expression += val; // Add current number to expression
                restExp = expression.substring(0, i); // Expression before last left par
                evalExp = expression.substring(i+1); // Expression inside pars, to evaluate
                expression = restExp;
                val = eval(evalExp); // TODO: Fix undefined error from empty pars
                display.value = val;
            }
        }
    }
}