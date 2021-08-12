'use strict'

class Muur {
    #naam;
 
    constructor() {
        this.#naam = "muur";
       
    }

    get naam() {
        return this.#naam;
    }
 
}