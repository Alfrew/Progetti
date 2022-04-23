"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
// Classe astratta
class Persona {
    constructor(nome, cognome) {
        this._nome = nome;
        this._cognome = cognome;
    }
}
// Sottoclasse User
class User extends Persona {
    constructor(id, _nome, _cognome, credito, numeroChiamate) {
        super(_nome, _cognome);
        this.id = id;
        this.credito = credito;
        this.numeroChiamate = numeroChiamate;
    }
    ricarica(valoreRicarica) {
        this.credito += valoreRicarica;
    }
    chiamata(minDurata) {
        this.numeroChiamate += 1;
        this.credito = +Number.parseFloat(this.credito - (0.22 + 0.24 * minDurata) + "").toFixed(2);
    }
    tel119() {
        return this.credito;
    }
    getNumeroChiamate() {
        return this.numeroChiamate;
    }
    azzeraChiamte() {
        this.numeroChiamate = 0;
    }
    get nome() {
        return this._nome;
    }
    get cognome() {
        return this._cognome;
    }
}
// Creazione utenti di default
let user1 = new User(0, "Valeria", "Ferretti", 25, 0);
let user2 = new User(1, "Gavino", "DelFrate", 50, 25);
let user3 = new User(2, "Kevin", "Maurone", 10, 2);
// *****************************************EXTRA**************************************************
// Dichiarazione variabili globali
let arr = [user1, user2, user3];
let selectedUser;
let durata;
let interval;
let tester = document.querySelector("#tester");
let display = document.querySelector("#display");
let closeCall = document.querySelector("#closeCall");
let userSelector = document.querySelector("#userSelector");
// Event listener
userSelector.addEventListener("change", selectUser);
(_a = document.querySelector("#btn1")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", infoCredito);
(_b = document.querySelector("#btn2")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", infoChiamate);
(_c = document.querySelector("#btn3")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", ricarica1);
(_d = document.querySelector("#btn4")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", ricarica2);
(_e = document.querySelector("#btn5")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", ricarica3);
(_f = document.querySelector("#btn6")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", ricarica4);
(_g = document.querySelector("#btn7")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", azzeramentoCalls);
(_h = document.querySelector("#btn8")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", telefonata);
(_j = document.querySelector("#newUser")) === null || _j === void 0 ? void 0 : _j.addEventListener("click", aggiungiUtente);
(_k = document.querySelector("#callBtn")) === null || _k === void 0 ? void 0 : _k.addEventListener("click", stopTelefonata);
// Creazione dinamica della tabella tramite l'array di utenti
for (let i = 0; i < arr.length; i++) {
    // Dati nuovo utente
    let id = arr[i].id;
    let name = arr[i].nome;
    let surname = arr[i].cognome;
    let credit = arr[i].credito;
    let call = arr[i].numeroChiamate;
    // Creazione di nuova riga della tabella
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${id}</td>
                        <td>${name}</td>
                        <td>${surname}</td>
                        <td id="credito${id}">${credit}&euro;</td>
                        <td id="call${id}">${call}</td>`;
    (_l = document.querySelector("#tb")) === null || _l === void 0 ? void 0 : _l.appendChild(newRow);
    // Creazione di nuova opzione del select
    let newOption = document.createElement("option");
    newOption.value = id + "";
    newOption.innerText = id + " " + name + " " + surname;
    userSelector.appendChild(newOption);
}
// Creazione di nuovi utenti
function aggiungiUtente() {
    var _a;
    // Selezione dei dati
    let input1 = document.querySelector("#name");
    let input2 = document.querySelector("#surname");
    let input3 = document.querySelector("#credit");
    // Dati nuovo utente e creazione utente
    let id = arr.length;
    let name = input1.value.trim();
    let surname = input2.value.trim();
    let credit = Number(input3.value);
    // Controllo basilare degli input
    if (name == "" || surname == "") {
        return alert("Scrivi nome e cognome per aggiungere un nuovo clienete");
    }
    else {
        arr.push(new User(id, name, surname, credit, 0));
        // Creazione di nuova riga della tabella
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${id}</td>
                            <td>${name}</td>
                            <td>${surname}</td>
                            <td id="credito${id}">${credit}&euro;</td>
                            <td id="call${id}">0</td>`;
        (_a = document.querySelector("#tb")) === null || _a === void 0 ? void 0 : _a.appendChild(newRow);
        // Creazione di nuova opzione del select
        let newOption = document.createElement("option");
        newOption.value = id + "";
        newOption.innerText = id + " " + name + " " + surname;
        userSelector.appendChild(newOption);
    }
}
// Selezione utente
function selectUser() {
    if (userSelector.value === "null") {
        display.innerText = "Seleziona un utente";
    }
    else {
        let sel = Number(userSelector.value);
        selectedUser = arr[sel];
        display.innerText = selectedUser.nome;
    }
}
// Funzioni sul credito telefonico
function infoCredito() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    }
    else {
        display.innerText = "Credito attuale: " + selectedUser.tel119() + "€";
    }
}
function ricarica1() {
    ricarica(5);
}
function ricarica2() {
    ricarica(15);
}
function ricarica3() {
    ricarica(25);
}
function ricarica4() {
    ricarica(50);
}
function ricarica(val) {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    }
    else {
        selectedUser.ricarica(val);
        let aggiornaCredito = document.querySelector("#credito" + selectedUser.id);
        aggiornaCredito.innerText = selectedUser.credito + "€";
        display.innerText = "Ricarica effettuata";
    }
}
// Funzioni sul numero chiamate
function infoChiamate() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    }
    else {
        display.innerText = "N. chiamate: " + selectedUser.getNumeroChiamate();
    }
}
function azzeramentoCalls() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    }
    else {
        selectedUser.azzeraChiamte();
        let aggiornaChiamate = document.querySelector("#call" + selectedUser.id);
        aggiornaChiamate.innerText = selectedUser.getNumeroChiamate() + "";
        display.innerText = "Chiamate azzerate";
    }
}
// Funzioni sulle telefonate
function telefonata() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    }
    else if (selectedUser.credito < 0.25) {
        display.innerText = "Credito insufficente";
    }
    else {
        startTelefonata();
    }
}
function startTelefonata() {
    // Creazione di variabili di conteggio credito in chiamata e di tempo (secondi & minuti)
    let creditCounter = selectedUser.credito - 0.22;
    let s = 0, m = 0;
    // Nasconde la pulsantiera, mostra il termina chiamata e disabilita il selettore utenti durante la chiamata
    tester.style.display = "none";
    closeCall.style.display = "flex";
    userSelector.disabled = true;
    display.innerText = "tuuu... tuuu...";
    // setInterval che ogni secondo aumenta la durata della telefonata e scala 0.004 centesimi dal contatore di credito mostrandolo al gestore
    interval = setInterval(function () {
        display.innerText = m + ":" + s;
        s++;
        if (s == 60) {
            m++;
            s = 0;
        }
        durata = m + s / 60;
        creditCounter -= 0.004;
        let aggiornaCredito = document.querySelector("#credito" + selectedUser.id + "");
        aggiornaCredito.innerText = creditCounter.toFixed(2) + "€";
        // Se il contatore di credito raggiunge i 0.01 centesimi blocca la chiamata per credito esaurito e scala il costo della chiamata all'utente
        if (creditCounter <= 0.01) {
            stopTelefonata();
            display.innerText = "Credito esaurito";
        }
    }, 1000);
}
function stopTelefonata() {
    // Mostra la pulsantiera, nasconde il termina chiamata e riabilita il selettore utenti
    tester.style.display = "flex";
    closeCall.style.display = "none";
    userSelector.disabled = false;
    display.innerText = "Chiamata terminata";
    // Blocca il setInterval e aggiorna il credito effettivo dell'utente
    clearInterval(interval);
    selectedUser.chiamata(durata);
    // Aggiorna la tabella del gestore
    let aggiornaCredito = document.querySelector("#credito" + selectedUser.id);
    aggiornaCredito.innerText = selectedUser.credito + "€";
    let aggiornaChiamate = document.querySelector("#call" + selectedUser.id);
    aggiornaChiamate.innerText = selectedUser.getNumeroChiamate() + "";
}
