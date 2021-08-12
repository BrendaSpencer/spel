"use strict"

class Schat {
    #naam;
    #waarde;
 
    constructor() {
        this.#naam = "schat";
        this.#waarde = Math.floor((Math.random() * 5)+1)*10 ;
     
    }

    get naam() {
        return this.#naam;
    }
    get waarde(){
        return this.#waarde;
    }
 
}




