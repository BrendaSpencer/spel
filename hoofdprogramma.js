"use strict";

let mijnSpel = new Spel(10 , 3, 10, 10);
let ouder = document.getElementById('spel');
mijnSpel.tonen(ouder);





window.addEventListener("keydown", function (event) {
    switch (event.code) {
        case "ArrowUp":
            mijnSpel.bewegen("naarBoven");
            break;
            case "ArrowDown":
                mijnSpel.bewegen("naarBeneden");
            break;
            case "ArrowLeft":
                mijnSpel.bewegen("naarLinks");
            break;
            case "ArrowRight":
                mijnSpel.bewegen("naarRechts");
            break;
    }
    
  
});



