var operand1 = "";
var operand2 = "";
var operation = "";
function onlyDigits(e){
    console.log(e.key);
    if((e.key >=0 && e.key <= 9) ||  e.key == "."){
        return true;
    }
    return false;
}

var button = document.querySelectorAll('.button');
var buttonSpan = document.querySelectorAll('.button span');

for(var i=0; i<button.length; i++){
    button[i].addEventListener("click", function(e){
        var buttonClass = e.target.classList[e.target.classList.length - 1];
        var result = handleMapping(buttonClass);
        if(result != ""){
            handleKeypad(result);
        }
    });
    buttonSpan[i].addEventListener("click", function(e){
        e.stopPropagation();
        var buttonClass = e.target.parentNode.classList[e.target.parentNode.classList.length - 1];
        var result = handleMapping(buttonClass);
        if(result != ""){
            handleKeypad(result);
        }
    });
}

function handleKeypad(value){
    var resultField = document.getElementById("resultField");
    if((Number.parseFloat(value) >= 0 && Number.parseFloat(value) <= 9) || value == "."){
        if(operation != "" && operand2 == ""){
            resultField.value = value;
            operand2 = Number.parseFloat(resultField.value);
            return;
        }
        resultField.value += value;
        operand2 = Number.parseFloat(resultField.value);
        return;
    }
    if(value == "clearAll"){
        operand1 = "";
        operand2 = "";
        operation = "";
        resultField.value = "";
        return;
    }
    if(resultField.value != "" && (value == "+" || value == "-" || value == "*" || value == "/" || value == "%")){
        if(operand1 != ""){
            operand2 = Number.parseFloat(resultField.value);
            resultField.value = eval(operand1 + operation + operand2);
            operand1 = Number.parseFloat(resultField.value);
            operand2 = "";
            operation = value;
            return;
        }
        operand1 = Number.parseFloat(resultField.value);
        operation = value;
        resultField.value = "";
        return;
    }
    if(resultField.value != "" && value == "changeSign"){
        resultField.value = 0 - Number.parseFloat(resultField.value);
        operand2 = Number.parseFloat(resultField.value);
        return;
    }
    if(resultField.value != "" && operand1 != "" && operation != "" && value == "="){
        operand2 = Number.parseFloat(resultField.value);
        resultField.value = eval(operand1 + operation + operand2);
        operand1 = "";
        operand2 = "";
        operation = "";
        return;
    }
}

function handleMapping(value){
    switch (value) {
        case "clearBtn": return "clearAll";
        case "negativeBtn": return "changeSign";
        case "modBtn": return "%";
        case "divideBtn": return "/";
        case "sevenBtn": return "7";
        case "eightBtn": return "8";
        case "nineBtn": return "9";
        case "multiplyBtn": return "*";
        case "fourBtn": return "4";
        case "fiveBtn": return "5";
        case "sixBtn": return "6";
        case "minusBtn": return "-";
        case "oneBtn": return "1";
        case "twoBtn": return "2";
        case "threeBtn": return "3";
        case "addBtn": return "+";
        case "zeroBtn": return "0";
        case "dotBtn": return ".";
        case "equalBtn": return "=";
    
        default: return "";
    }
}