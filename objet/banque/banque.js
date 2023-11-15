class Banque {
    constructor(Nombanque, Adresse, NombreClient = []) {
        this.Nombanque = Nombanque;
        this.Adresse = Adresse;
        this.NombreClient = NombreClient;
    }
    getNombanque() {
        return this.Nombanque;
    }
    setNombanque(in_Nombanque) {
        this.Nombanque = in_Nombanque;
    }

    getAdresse() {
        return this.Adresse;
    }
    setAdresse(in_Adresse) {
        this.Adresse = in_Adresse;
    }

    getNombreClient() {
        return this.NombreClient;
    }
    setNombreClient(in_NombreClient) {
        this.NombreClient = in_NombreClient;
    }

}
class Client {
    constructor(NrCompte = 1, Nom, Prenom, Adresse, Somme = 0, decouvert = -800.001, debit = 1000) {
        this.NrCompte = NrCompte;
        this.Nom = Nom;
        this.Prenom = Prenom;
        this.Adresse = Adresse;
        this.Somme = Somme;
        this.decouvert = decouvert;
        this.debit = debit;
    }
    getNrCompte() {
        return this.NrCompte;
    }
    setNrCompte(in_NrCompte) {
        this.NrCompte = in_NrCompte;
    }
    getNom() {
        return this.Nom;
    }
    setNom(in_Nom) {
        this.Nom = in_Nom;
    }
    getPrenom() {
        return this.Prenom;
    }
    setPrenom(in_Prenom) {
        this.Prenom = in_Prenom;
    }

    getSomme() {
        return this.Somme;
    }
    setSomme(in_Somme) {
        this.Somme = in_Somme;
    }

    Decouvert() {
        if (this.Somme < 0) {
            return true;
        }
        else {
            return false;
        }
    }

    JourDePaie(param) {
        let Paie = this.Somme + param;
        this.setSomme(Paie);
        return this.getSomme();
    }

    Debit(montant) {

        const nouveauTotal = this.Somme - montant;
        if (nouveauTotal <= this.decouvert) {
            console.log("Vous avez dépassé le quota");
        }
        this.setSomme(nouveauTotal);
    }

    virement(montant, receiver) {
        const nouveauTotal = this.Somme - montant;
        if (montant <= this.debit) {
            if (nouveauTotal <= this.decouvert) {
                // receiver.setSomme(receiver.getSomme() - montant);
            } else {
                receiver.setSomme(receiver.getSomme() + montant);
                this.setSomme(nouveauTotal);
            }
        }
    }
}

function GenCompte() {
    let Nr = 1;

    return Nr;
}