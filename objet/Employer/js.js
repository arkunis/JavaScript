class Agence {
    constructor(NomAgence="", restauration) {
        this.NomAgence = NomAgence;
        this.restauration = restauration;
        
    }
    Restaurant() {
        if (this.restauration === false) {
            // console.log(this.nom + " " + this.prenom + " a accès au ticket restaurant")
            return true;
        } else {
            // console.log(this.nom + " " + this.prenom + " n'a pas accès au ticket restaurant")
            return false;
        }
    }
}
class Employe {
    constructor(agence="", nom="", prenom="", dateEmb="", fonction="", salaireK = 0, service="", enfant = []) {
        this.agence = agence;
        this.nom = nom;
        this.prenom = prenom;
        this.dateEmb = dateEmb;
        this.fonction = fonction;
        this.salaireK = salaireK;
        this.service = service;
        this.enfant = enfant;
    }

    Restaurant() {
        if (this.restauration === false) {
            // console.log(this.nom + " " + this.prenom + " a accès au ticket restaurant")
            return true;
        } else {
            // console.log(this.nom + " " + this.prenom + " n'a pas accès au ticket restaurant")
            return false;
        }
    }

    annee() {

        let date = new Date();
        let date2 = new Date(this.dateEmb);
        let Annee = date.getYear();
        let Mois = date.getMonth() + 1;
        let Jour = date.getDate()
        let AnneeDecimal = Annee - date2.getYear();
        if (date2.getMonth() + 1 == Mois && date2.getDate() == Jour) {

        } else {
            return AnneeDecimal;
        }
        return AnneeDecimal;
    }

    salaire() {
        let salaire = this.salaireK;
        if (this.annee() > 9) {
            salaire = salaire * 7 / 100;
            // console.log('+7% ' + salaire + "€ Pour " + this.prenom);

            return salaire;
        } else {
            salaire = salaire * 5 / 100;
            // console.log('+5% ' + salaire + "€ Pour " + this.prenom);
            return salaire;
        }

    }
    AnneePlus1() {
        this.salaire();
        this.annee();
        let date = new Date();
        let date2 = new Date(this.dateEmb);

        let Annee = date.getYear();
        let Mois = date.getMonth() + 1;
        let Jour = date.getDate()
        if (Mois == Mois && Jour == Jour) {
            date2.setFullYear(date2.getFullYear() - 1);
        }
    }

    vacance() {
        if (this.annee() >= 1) {
            // console.log(this.nom + " " + this.prenom + " a accès au chèques vacance")
            return true;
        }
        else {
            // console.log(this.nom + " " + this.prenom + " n'a pas accès au chèques vacance")
            return false;
        }
    }
}

class Directeur extends Employe {
    salaire() {
        let salaire = this.salaireK;

        salaire = salaire * 10 / 100;
        // console.log('+10% ' + salaire + "€ Pour " + this.prenom);
        return salaire;

    }
}

class Enfant extends Employe {
    constructor(nom = "", prenom = "", age = "") {
        super();
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
    }

    anneeEnfant() {

        let date = new Date();
        let date2 = new Date(this.age);
        let Annee = date.getYear();
        let Mois = date.getMonth() + 1;
        let Jour = date.getDate()
        let AnneeDecimal = Annee - date2.getYear();

        if (date2.getMonth() + 1 == Mois && date2.getDate() == Jour) {

        } else {
            return AnneeDecimal;
        }
        return AnneeDecimal;
    }

    ticketNoel() {
        let passNoel = [];
        switch (true) {
            case this.anneeEnfant() < 10:
                // console.log("1 Ticket de 20€");
                passNoel.push("1 ticket de 20€");
                break;

            case this.anneeEnfant() < 15:
                // console.log("1 Ticket de 30€")
                passNoel.push("1 ticket de 30€");
                break;

            case this.anneeEnfant() <= 18:
                // console.log("1 Ticket de 50€")
                passNoel.push("1 ticket de 50€");
                break;

            default: return passNoel[0] = "0";
        }
        // if (passNoel[0] == undefined) {
        //     return passNoel[0] = "";
        // } else {
        //     return passNoel[0];
        // }
        return passNoel[0];
    }
}