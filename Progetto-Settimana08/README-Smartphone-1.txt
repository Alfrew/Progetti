Progettare un interfaccia di nome Smartphone, per rappresentare un telefono cellulare con contratto a ricarica.
Tale interfaccia prevede due variabili d'istanza. La prima variabile d'istanza e' definita come carica: number, e rappresenta il quantitativo di euro
disponibile per le chiamate. La seconda variabile d'istanza e' definita come numeroChiamate: number, e rappresenta il numero di chiamate effettuate con
il cellulare.
Classe User che deve implementare l'interfaccia Smartphone e definire i seguenti metodi: 
Un metodo definito come public ricarica(unaRicarica: number): void, che ricarica il telefonino. 
Un metodo definito come public chiamata(minutiDurata: number): void, cheeffettua una chiamata di durata in minuti specificata dal parametro esplicito.
Tale metodo dovra' aggiornare la carica disponibile, ed incrementare la memoria contenente il numero di chiamate effettuate dal telefonino. 
Si assuma un costo di 0.20 euro per ogni minuto di chiamata,
un metodo public numero404(): number, che restituisce il valore della carica disponibile. 
Un metodo public getNumeroChiamate(): number, che restituisce il valore della variabile d'istanza numeroChiamate. 
Infine, un metodo public azzeraChiamate(): void , che azzera la variabile contenente il numero di chiamate effettuate dal telefonino.
Le istanze FirstUser-SecondUser-ThirdUser della classe User.
Provare i metodi e verificare il saldo residuo di ogni utente e quante chiamate sono state effettuate.