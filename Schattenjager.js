'use strict'
class Schattenjager {
    #naam;
    #winst;
    #gevondenSchatten;
    #levens;
   
    constructor(levens) {
        this.#naam = "schattenjager";
        this.#winst = 0;
        this.#levens = levens;
        this.#gevondenSchatten = 0;
    }
   
 
    get gevondenSchatten(){
        return this.#gevondenSchatten;
    }
    get naam() {
        return this.#naam;
    }
    get winst(){
        return this.#winst;
    }
    get levens(){
        return this.#levens;
    }
    set levens(aantal){
        if(this.#levens <= 0){
            return 'verloren';
        }else{
            this.#levens = aantal
        }
    }

    set winst(totaal){
        this.#winst = totaal; 
    }
 
    set gevondenSchatten(aantal){
        this.#gevondenSchatten = aantal;
    }
    levensMinderen(){
        this.levens -= 1;
    }
    schattenTellen(){
        this.gevondenSchatten += 1;
    }

}
