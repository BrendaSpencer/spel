'use strict';

class Spel {
    #rijen;
    #kolommen;
    #schattenjager;
    #vijand;
    #aantalMuren;
    #aantalSchatten;
    #spelitems = []
    constructor(aantalMuren, aantalSchatten, kolommen, rijen) {
        this.#aantalMuren = aantalMuren;
        this.#aantalSchatten = aantalSchatten;
        this.#kolommen = kolommen;
        this.#rijen = rijen;
        this.#schattenjager = new Schattenjager(5);
        this.#vijand = new Vijand();
        this.#spelitems = this.bord();
        this.muurMaken(this.#aantalMuren);
        this.schatMaken(this.#aantalSchatten);
        this.itemtoevoegen(this.#schattenjager);
        this.itemtoevoegen(this.#vijand);
    }
    get spelitems() {
        return this.#spelitems
    }
    get schattenjager() {
        return this.#schattenjager
    }
    get spelitems() {
        return this.#spelitems
    }

    // bord vullen met gras
    bord() {
        for (let row = 0; row < this.#rijen; row++) {
            this.#spelitems[row] = [];
            for (let column = 0; column < this.#kolommen; column++) {
                this.#spelitems[row][column] = [];
                this.#spelitems[row][column] = new Gras();
            }
        }
        return this.#spelitems;
    }

    // muren maken en doorgeven naar de volgende methode
    muurMaken(aantal) {
        for (let i = 0; i < aantal; i++) {
            let spelitem = new Muur();
            this.itemtoevoegen(spelitem);
        }
    }

    // schatten maken en doorgeven naar de volgende methode
    schatMaken(aantal) {
        for (let i = 0; i < aantal; i++) {
            let spelitem = new Schat();
            this.itemtoevoegen(spelitem);
        }
    }

    // schatten, muren, karakters toevoegen aan bord
    itemtoevoegen(spelitem) {
        let x = this.randomXcijfer();
        let y = this.randomYcijfer();
        while (this.#spelitems[y][x].naam != "gras") {
            x = this.randomXcijfer();
            y = this.randomYcijfer();
        }
        this.#spelitems[y][x] = spelitem;

    }

    randomYcijfer() {
        return Math.floor(Math.random() * this.#rijen);
    }
    randomXcijfer() {
        return Math.floor(Math.random() * this.#kolommen);
    }

    // schattenjager richting bepalen voor verplaatsen 
    bewegen(richting) {
        const search = this.#schattenjager;
        const row = this.#spelitems.findIndex(row => row.includes(search));
        const col = this.#spelitems[row].indexOf(search);
        let nieuweY = row;
        let nieuweX = col;

        if (this.#schattenjager.levens > 0 && this.#aantalSchatten > this.#schattenjager.gevondenSchatten) {
            switch (richting) {
                case "naarBoven":
                    nieuweY -= 1;
                    this.bewegen(nieuweY, nieuweX, row, col);
                    break;
                case "naarBeneden":
                    nieuweY += 1;
                    this.bewegen(nieuweY, nieuweX, row, col);
                    break;
                case "naarLinks":
                    nieuweX -= 1;
                    this.bewegen(nieuweY, nieuweX, row, col);
                    break;
                case "naarRechts":
                    nieuweX += 1;
                    this.bewegen(nieuweY, nieuweX, row, col);
                    break;
            }
        }
       this.vijandVerplaatsen();
    }


    // schattenjager verplaatsen
    bewegen(nieuweY, nieuweX, row, col) {
        if (nieuweX >= 0 && nieuweX <= this.#kolommen) {
            this.grasChecken(this.#schattenjager, row, col, nieuweX, nieuweY)
            if (this.#spelitems[nieuweY][nieuweX].naam == "schat") {
                let totaal = this.#spelitems[nieuweY][nieuweX].waarde;
                this.#spelitems[row][col] = new Gras();
                this.#spelitems[nieuweY][nieuweX] = this.#schattenjager;
                this.schattenVerzamelen(totaal)
            }
            if (this.#spelitems[nieuweY][nieuweX].naam == "vijand") {
                this.levenVerwijderen()
            }
            this.tonen(ouder)
        }
    }

    schattenVerzamelen(totaal) {
        this.#schattenjager.winst += totaal;
        this.#schattenjager.schattenTellen();
        if (this.#aantalSchatten == this.#schattenjager.gevondenSchatten) {
            console.log('gewonnen')
        }
    }

    levenVerwijderen() {
        this.#schattenjager.levensMinderen();
        if (this.#schattenjager.levens == 0) {
            console.log("VERLOREN");
        };
    }

    grasChecken(karakter, row, col, nieuweCol, nieuweRow) {
        if (this.#spelitems[nieuweRow][nieuweCol].naam == "gras") {
            this.#spelitems[row][col] = new Gras();
            this.#spelitems[nieuweRow][nieuweCol] = karakter;

        }
    }

    vijandVerplaatsen() {
        const search = this.#vijand;
        let row = this.#spelitems.findIndex(row => row.includes(search));
        let col = this.#spelitems[row].indexOf(search);
        let nieuweRow = row;
        let nieuweCol = col;
        const searchSchattenjager = this.#schattenjager;
        let rowSchattenjager = this.#spelitems.findIndex(row => row.includes(searchSchattenjager));
        let colSchattenjager = this.#spelitems[row].indexOf(searchSchattenjager);
        if(this.#schattenjager.gevondenSchatten == this.#aantalSchatten){
            return "gewonnen";
        }else{
        if (row == 0 || row < rowSchattenjager) {
            nieuweRow += 1;
        } else if (col == 0 || col < colSchattenjager) {
            nieuweCol += 1;
        } else if (row == this.#rijen || row > rowSchattenjager) {
            nieuweRow -= 1;
        } else if (col == this.#kolommen || col > colSchattenjager) {
            nieuweCol -= 1;
        }
        if (this.#spelitems[nieuweRow][nieuweCol].naam == 'schattenjager') {
            this.levenVerwijderen();
        }
        this.grasChecken(this.#vijand, row, col, nieuweCol, nieuweRow)
        this.tonen(ouder)
    }
}

    tonen(ouder) {
        while (ouder.lastChild !== null) {
            ouder.lastChild.remove();
        }
        let speelbord = document.createElement('div');
        let totaleWinst = document.createElement('h3');
        let aantalLevens = document.createElement('h3');
        totaleWinst.innerText = `totale winst : ${this.#schattenjager.winst}`;
        aantalLevens.innerHTML = `aantal levens : ${this.#schattenjager.levens}`;
        ouder.appendChild(totaleWinst);
        ouder.appendChild(aantalLevens);
        for (let elk of this.#spelitems) {
            for (let elke of elk) {
                let kind = document.createElement("div");
                kind.classList.add(`${elke.naam}`);
                speelbord.appendChild(kind);
            }
        }
        speelbord.classList.add("ouder")
        ouder.appendChild(speelbord)

    }
}







