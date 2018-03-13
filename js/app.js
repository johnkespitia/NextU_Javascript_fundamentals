var display = document.getElementById('display');
var teclas = document.getElementsByClassName('tecla');
var lastOperac = "first";
var calculadora = (function (inicial) {
    var num1 = inicial;
    var resultado = 0;
    return{
        asignar: function (new_num) {
            num1 = new_num;
        },
        sumar: function () {
            resultado = Number(resultado) + Number(num1);
        },
        restar: function () {
            resultado = Number(resultado) - Number(num1);
        },
        multiplicar: function () {
            resultado = Number(resultado) * Number(num1);
        },
        dividir: function () {
            if (num1 != 0) {
                resultado = Number(resultado) / Number(num1);
            } else {
                alert("Valor inválido!");
            }
        },
        resultado: function () {
            var tmp_res = String(resultado);
            if (tmp_res.length > 8) {
                tmp_res = tmp_res.substring(0, 8);
            }
            display.innerHTML = tmp_res;
        },
        first: function () {
            resultado = num1;
            num1 = 0;
        },
        limpiar: function () {
            resultado = 0;
            num1: 0;
        }
    }
})(0);

for (i = 0; teclas.length; i++) {
    teclas[i].addEventListener('mouseover', function () {
        this.style = "padding:3px";
    });
    teclas[i].addEventListener('mouseout', function () {
        this.style = "padding:0px";
    });
    teclas[i].addEventListener('click', function () {
        if (!isNaN(this.id)) {
            reloadDisplay(this.id);
        } else if (this.id == 'on') {
            calculadora.limpiar();
            calculadora.resultado();
            lastOperac = 'first';
        } else if (this.id == 'igual') {
            lastOpera();
            calculadora.resultado();
        } else if (this.id == 'punto') {
            addpunto();
        } else if (this.id == 'sign') {
            setSign();
        } else {
            lastOpera();
            lastOperac = this.id;
            display.innerHTML = '0';
        }
    });
}

function lastOpera() {
    if (lastOperac == 'mas') {
        calculadora.sumar();
    }
    if (lastOperac == 'menos') {
        calculadora.restar();
    }
    if (lastOperac == 'por') {
        calculadora.multiplicar();
    }
    if (lastOperac == 'dividido') {
        calculadora.dividir();
    }
    if (lastOperac == 'first') {
        calculadora.first();
    }
}
function reloadDisplay(number) {
    var info = display.innerHTML;
    if (info.length < 8) {
        if (info == "0") {
            info = number;
        } else {
            info = info + number;
        }
    }
    calculadora.asignar(info);
    display.innerHTML = info;
}
function addpunto() {
    var info = display.innerHTML;
    if (info.indexOf('.') < 0) {
        if (info != '') {
            info = info + ".";
        } else {
            info = "0.";
        }
    }
    calculadora.asignar(info);
    display.innerHTML = info;
}

function setSign() {
    if (Number(display.innerHTML)!=0){
        var total = Number(display.innerHTML)*(-1);
        calculadora.asignar(total);
        display.innerHTML=total;
    }
}