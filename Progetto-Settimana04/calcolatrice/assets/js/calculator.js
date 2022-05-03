const calc = { //memoria della calcolatrice
    display: '',
    num1: null,
    operator: null,
    num2: null,
    waitnum2: false,
}

//TYPO
function number(num) {
    calc.waitnum2 = (calc.num1 !== null && calc.operator !== null) ? true : false
    calc.display += num //permette di scrivere numeratori a più cifre
    if (calc.waitnum2 == false) {
        calc.num2 = null //resetta il secondo numeratore dopo l'uguale
        calc.num1 = Number(calc.display) //trasforma la stringa in numero
    } else if (calc.waitnum2 == true) { //evita di far scrivere il secondo numeratore prima dell'operatore
        calc.num2 = Number(calc.display)
    }
    document.getElementById('display').value = calc.display //mostra a schermo 
}
function point(char) {
    if (calc.display.indexOf('.') == -1) { //impedisce di scrivere più punti
        if (calc.display === '') { //aggiunge lo 0 prima del . se non sono presenti altri numeri
            calc.display = 0
        }
        calc.waitnum2 = (calc.num1 !== null && calc.operator !== null) ? true : false
        if (calc.waitnum2 == false) {
            calc.display += char //permette di scrivere numeratori a più cifre
            calc.num1 = Number(calc.display) //trasforma la stringa in numero
        } else if (calc.waitnum2 == true) {
            calc.display += char //permette di scrivere numeratori a più cifre
            calc.num2 = Number(calc.display)
        }
        document.getElementById('display').value = calc.display
    }
}

//ALL CLEAN
function AC() { //ripristina la memoria della calcolatrice
    calc.display = ''
    calc.num1 = null
    calc.operator = null
    calc.num2 = null
    calc.waitnum2 = false
    document.getElementById('display').value = calc.display
    document.getElementById("negBtn").disabled = false;
}

//CANCEL
function canc() { //cancella un carattere
    if (calc.operator === null) { //primo numeratore
        calc.display = calc.display.slice(-0, -1)
        document.getElementById('display').value = calc.display
        calc.num1 = Number(calc.display) //trasforma la stringa in numero
    } else if (calc.operator !== null) { //secondo numeratore
        calc.display = calc.display.slice(-0, -1)
        document.getElementById('display').value = calc.display
        calc.num2 = Number(calc.display)
    }
}

//OPERATORS
function oper(op) {
    if (calc.num1 !== null && calc.num2 !== null && calc.display !== '') {
        result() //restituisce il risultato se cliccato dopo il secondo numeratore
    }
    calc.operator = op
    calc.display = ''
}
function neg() { //rende negativo il primo numeratore
    calc.display = '-' + calc.display
    document.getElementById('display').value = calc.display
    calc.num1 = Number(calc.display) //trasforma la stringa in numero
    document.getElementById("negBtn").disabled = true; //disattiva il tasto dopo che è stato usato
}

//RESULT
function result() { //effettua l'operazione scelta
    if (calc.operator == 'à') {
        calc.display = Math.pow(calc.num1, calc.num2)
    } else if (calc.operator == '/') {
        calc.display = calc.num1 / calc.num2
    } else if (calc.operator == '*') {
        calc.display = calc.num1 * calc.num2
    } else if (calc.operator == '-') {
        calc.display = calc.num1 - calc.num2
    } else if (calc.operator == '+') {
        calc.display = calc.num1 + calc.num2
    }
    document.getElementById('display').value = calc.display //mostra il risultato a schermo
    calc.num1 = calc.display //permette di usare il risultato come primo numeratore
    calc.display = '' //resetta il display
    document.getElementById("negBtn").disabled = false; //riattiva il tasto per rendere negativo il numeratore
}