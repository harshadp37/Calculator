var operand1 = "";
var operand2 = "";
var operation = "";

function onlyDigits(e){
    if((e.key >=0 && e.key <= 9) ||  e.key == "."){
        return true;
    }
    return false;
}

function themeToggle(){
    var isChecked = document.getElementById('themeToggle').checked;
    var root = document.documentElement;
    if(isChecked){
        root.style.setProperty('--keyPadBC1', "#2d3134");
        root.style.setProperty('--inputBC', "#1f2125");
        root.style.setProperty('--keyPadC1', "#697df8");
        root.style.setProperty('--externalBC', "#697df8");
        root.style.setProperty('--externalC', "#e4e6ea");
        root.style.setProperty('--themeBC', "#c16c51");
        root.style.setProperty('--themeC', "#000000");
    }else{
        root.style.setProperty('--keyPadBC1', "#1f2125");
        root.style.setProperty('--inputBC', "#2d3134");
        root.style.setProperty('--keyPadC1', "#c16c51");
        root.style.setProperty('--externalBC', "#c16c51");
        root.style.setProperty('--externalC', "#000000");
        root.style.setProperty('--themeBC', "#697df8");
        root.style.setProperty('--themeC', "#e4e6ea");
    }
}

var toggleBtn = document.querySelectorAll('.toggleBtn');
var toggleBtnSpan = document.querySelectorAll('.toggleBtn span');

for(var i=0; i<toggleBtn.length; i++){
    toggleBtn[i].addEventListener("click", function(e){
        var moreBtn = document.querySelectorAll('.moreBtn')[0];
        var exKeypad = document.querySelectorAll('.exKeypad')[0];
        
        if(exKeypad.classList.contains('closed')){
            moreBtn.classList.add('closed');
            setTimeout(()=>{
                exKeypad.classList.remove('closed');
            }, 500);
            
        }else{
            exKeypad.classList.add('closed');
            setTimeout(()=>{
                moreBtn.classList.remove('closed');
            }, 500);
            
        }
    })
    toggleBtnSpan[i].addEventListener("click", function(e){
        e.stopPropagation();
        var moreBtn = document.querySelectorAll('.moreBtn')[0];
        var exKeypad = document.querySelectorAll('.exKeypad')[0];
        
        if(exKeypad.classList.contains('closed')){
            moreBtn.classList.add('closed');
            setTimeout(()=>{
                exKeypad.classList.remove('closed');
            }, 300);
        }else{
            exKeypad.classList.add('closed');
            setTimeout(()=>{
                moreBtn.classList.remove('closed');
            }, 300);
        }
    })
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
    if(resultField.value != "" && value == "oneBy"){
        if(operand1 != ""){
            operand2 = Number.parseFloat(resultField.value);
            resultField.value = eval(operand1 + operation + (1 / operand2));
            operand1 = "";
            operand2 = "";
            operation = "";
            return;
        }
        operand1 = Number.parseFloat(resultField.value);
        resultField.value = eval(1 / operand1);
        operand1 = "";
        operand2 = "";
        operation = "";
        return;
    }
    if(resultField.value != "" && value == "root"){
        if(operand1 != ""){
            operand2 = Number.parseFloat(resultField.value);
            resultField.value = eval(operand1 + operation + Math.sqrt(operand2));
            operand1 = "";
            operand2 = "";
            operation = "";
            return;
        }
        operand1 = Number.parseFloat(resultField.value);
        resultField.value = eval(Math.sqrt(operand1));
        operand1 = "";
        operand2 = "";
        operation = "";
        return;
    }
    if(resultField.value != "" && value == "square"){
        if(operand1 != ""){
            operand2 = Number.parseFloat(resultField.value);
            resultField.value = eval(operand1 + operation + (operand2 * operand2));
            operand1 = "";
            operand2 = "";
            operation = "";
            return;
        }
        operand1 = Number.parseFloat(resultField.value);
        resultField.value = eval(operand1 * operand1);
        operand1 = "";
        operand2 = "";
        operation = "";
        return;
    }
    if(resultField.value != "" && value == "cube"){
        if(operand1 != ""){
            operand2 = Number.parseFloat(resultField.value);
            resultField.value = eval(operand1 + operation + (Math.pow(operand2, 3)));
            operand1 = "";
            operand2 = "";
            operation = "";
            return;
        }
        operand1 = Number.parseFloat(resultField.value);
        resultField.value = eval(Math.pow(operand1, 3));
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
        case "squareBtn": return "square";
        case "cubeBtn": return "cube";
        case "rootBtn": return "root";
        case "oneByBtn": return "oneBy";
    
        default: return "";
    }
}