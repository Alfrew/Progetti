//  **********************************RICHIESTA-TRACCIA********************************************
// Interfaccia smartphone
interface ISmartphone {
    credito: number; //credito del cellulare
    numeroChiamate: number; //numero di chiamate effettuate
}
// Classe astratta
abstract class Persona {
    protected _nome: string;
    protected _cognome: string;
    constructor(nome: string, cognome: string) {
        this._nome = nome;
        this._cognome = cognome;
    }
}
// Sottoclasse User
class User extends Persona implements ISmartphone {
    id: number;
    credito: number;
    numeroChiamate: number;
    constructor(id: number, _nome: string, _cognome: string, credito: number, numeroChiamate: number) {
        super(_nome, _cognome);
        this.id = id;
        this.credito = credito;
        this.numeroChiamate = numeroChiamate;
    }
    public ricarica(valoreRicarica: number): void {
        this.credito += valoreRicarica;
    }
    public chiamata(minDurata: number): void {
        this.numeroChiamate += 1;
        this.credito = +Number.parseFloat(this.credito - (0.22 + 0.24 * minDurata) + "").toFixed(2);
    }
    public tel119(): number {
        return this.credito;
    }
    public getNumeroChiamate(): number {
        return this.numeroChiamate;
    }
    public azzeraChiamte(): void {
        this.numeroChiamate = 0;
    }
    get nome(): string {
        return this._nome;
    }
    get cognome(): string {
        return this._cognome;
    }
}
// Creazione utenti di default
let user1 = new User(0, "Valeria", "Ferretti", 25, 0);
let user2 = new User(1, "Gavino", "DelFrate", 50, 25);
let user3 = new User(2, "Kevin", "Maurone", 10, 2);

// *****************************************EXTRA**************************************************
// Dichiarazione variabili globali
let arr: User[] = [user1, user2, user3];
let selectedUser: User;
let durata: number;
let interval: number;
let tester = <HTMLDivElement>document.querySelector("#tester");
let display = <HTMLSpanElement>document.querySelector("#display");
let closeCall = <HTMLDivElement>document.querySelector("#closeCall");
let userSelector = <HTMLSelectElement>document.querySelector("#userSelector");
// Event listener
userSelector.addEventListener("change", selectUser);
document.querySelector("#btn1")?.addEventListener("click", infoCredito);
document.querySelector("#btn2")?.addEventListener("click", infoChiamate);
document.querySelector("#btn3")?.addEventListener("click", ricarica1);
document.querySelector("#btn4")?.addEventListener("click", ricarica2);
document.querySelector("#btn5")?.addEventListener("click", ricarica3);
document.querySelector("#btn6")?.addEventListener("click", ricarica4);
document.querySelector("#btn7")?.addEventListener("click", azzeramentoCalls);
document.querySelector("#btn8")?.addEventListener("click", telefonata);
document.querySelector("#newUser")?.addEventListener("click", aggiungiUtente);
document.querySelector("#callBtn")?.addEventListener("click", stopTelefonata);

// Creazione dinamica della tabella tramite l'array di utenti
for (let i = 0; i < arr.length; i++) {
    // Dati nuovo utente
    let id: number = arr[i].id;
    let name: string = arr[i].nome;
    let surname: string = arr[i].cognome;
    let credit: number = arr[i].credito;
    let call: number = arr[i].numeroChiamate;
    // Creazione di nuova riga della tabella
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${id}</td>
                        <td>${name}</td>
                        <td>${surname}</td>
                        <td id="credito${id}">${credit}&euro;</td>
                        <td id="call${id}">${call}</td>`;
    document.querySelector("#tb")?.appendChild(newRow);
    // Creazione di nuova opzione del select
    let newOption = document.createElement("option");
    newOption.value = id + "";
    newOption.innerText = id + " " + name + " " + surname;
    userSelector.appendChild(newOption);
}

// Creazione di nuovi utenti
function aggiungiUtente(): void {
    // Selezione dei dati
    let input1 = <HTMLInputElement>document.querySelector("#name");
    let input2 = <HTMLInputElement>document.querySelector("#surname");
    let input3 = <HTMLInputElement>document.querySelector("#credit");
    // Dati nuovo utente e creazione utente
    let id: number = arr.length;
    let name: string = input1.value.trim();
    let surname: string = input2.value.trim();
    let credit: number = Number(input3.value);
    // Controllo basilare degli input
    if (name == "" || surname == "") {
        return alert("Scrivi nome e cognome per aggiungere un nuovo clienete");
    } else {
        arr.push(new User(id, name, surname, credit, 0));
        // Creazione di nuova riga della tabella
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${id}</td>
                            <td>${name}</td>
                            <td>${surname}</td>
                            <td id="credito${id}">${credit}&euro;</td>
                            <td id="call${id}">0</td>`;
        document.querySelector("#tb")?.appendChild(newRow);
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
    } else {
        let sel = Number(userSelector.value);
        selectedUser = arr[sel];
        display.innerText = selectedUser.nome;
    }
}

// Funzioni sul credito telefonico
function infoCredito() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    } else {
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
function ricarica(val: number) {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    } else {
        selectedUser.ricarica(val);
        let aggiornaCredito = <HTMLInputElement>document.querySelector("#credito" + selectedUser.id);
        aggiornaCredito.innerText = selectedUser.credito + "€";
        display.innerText = "Ricarica effettuata";
    }
}

// Funzioni sul numero chiamate
function infoChiamate() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    } else {
        display.innerText = "N. chiamate: " + selectedUser.getNumeroChiamate();
    }
}
function azzeramentoCalls() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    } else {
        selectedUser.azzeraChiamte();
        let aggiornaChiamate = <HTMLInputElement>document.querySelector("#call" + selectedUser.id);
        aggiornaChiamate.innerText = selectedUser.getNumeroChiamate() + "";
        display.innerText = "Chiamate azzerate";
    }
}

// Funzioni sulle telefonate
function telefonata() {
    if (selectedUser == null) {
        display.innerText = "Seleziona un utente";
    } else if (selectedUser.credito < 0.25) {
        display.innerText = "Credito insufficente";
    } else {
        startTelefonata();
    }
}

function startTelefonata() {
    // Creazione di variabili di conteggio credito in chiamata e di tempo (secondi & minuti)
    let creditCounter: number = selectedUser.credito - 0.22;
    let s = 0,
        m = 0;
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
        let aggiornaCredito = <HTMLInputElement>document.querySelector("#credito" + selectedUser.id + "");
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
    let aggiornaCredito = <HTMLInputElement>document.querySelector("#credito" + selectedUser.id);
    aggiornaCredito.innerText = selectedUser.credito + "€";
    let aggiornaChiamate = <HTMLInputElement>document.querySelector("#call" + selectedUser.id);
    aggiornaChiamate.innerText = selectedUser.getNumeroChiamate() + "";
}
