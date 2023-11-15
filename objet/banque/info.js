let modal;
let datatomodified = '';
function init() {
    $(document).ready(function () {
        $('#tableFun').DataTable({
            ordering: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json'
            }
        });
        const targetEl = document.getElementById('authentication-modal');

        // options with default values
        const options = {
            placement: 'center',
            backdrop: 'dynamic',
            // backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
            closable: true,
            onHide: () => {
                // console.log('modal is hidden');
            },
            onShow: () => {
                // console.log('modal is shown');
            }
        };

        modal = new Modal(targetEl, options);
        document.getElementById('buttonClose').addEventListener('click', () => { modal.hide() })
        document.getElementById('valider').addEventListener('click', () => {
            if (document.getElementById('text').value < 0) {
                document.getElementsByClassName(`rouge`)[0].style.color = "red"
            } else if (document.getElementById('text').value >= 0) {
                document.getElementsByClassName(`rouge`)[0].style.color = "black"
            }
            document.getElementById(datatomodified).innerHTML = document.getElementById('text').value;
            modal.hide();
        });
    })

    compteClient();
}

function compteClient() {
    let GenRCompte = GenCompte();
    let Client1 = new Client(GenRCompte++, "Cailloux", "Pierre", "Lieu", 500);
    let Client2 = new Client(GenRCompte++, "Cailloux", "Rocher", "Dit", 500);
    let Client3 = new Client(GenRCompte++, "Cailloux", "Granit", "Du", 500);
    let Client4 = new Client(GenRCompte++, "Cailloux", "Saphir", "Char", 500);
    let Client5 = new Client(GenRCompte++, "Cailloux", "Emeraude", "Char", 500);

    let ListeClient = [Client1, Client2, Client3, Client4, Client5];

    let banque1 = new Banque("Axa", "Lieu du dit", ListeClient);

    // console.log(banque1.NombreClient)

    Client1.virement(1000, Client4);
    Client1.virement(300, Client4);
    Client2.virement(1000, Client4);
    // Client2.virement(1000, Client4);
    // Client2.virement(1000, Client4);
    // Client3.virement(1000, Client4);
    // Client3.virement(1000, Client4);

    let clientData = document.getElementById('dataClient');

    ListeClient.forEach(function (ClientValue) {

        // ClientValue.JourDePaie(500);

        // ClientValue.Debit(500);

        // console.log(`Numéro de compte : ${ClientValue.NrCompte} // Nom : ${ClientValue.Nom} // Prénom : ${ClientValue.Prenom} // Adresse : ${ClientValue.Adresse} // Somme dispo : ${ClientValue.Somme} // Decouvert autorisé : ${ClientValue.decouvert.toFixed(0)} // Débit max autorisé ${ClientValue.debit}`);

        // if (ClientValue.Decouvert() == true) {
        //     document.getElementById('decouvert').innerHTML += `${ClientValue.Nom} ${ClientValue.Prenom} est à découvert de ${ClientValue.Somme}€ <br>`;
        // }


        let infoClient = document.createElement('tr');
        infoClient.innerHTML = `<td id="compte-${ClientValue.NrCompte}">${ClientValue.NrCompte}</td>
        <td id="nom-${ClientValue.NrCompte}">${ClientValue.Nom}</td>
        <td id="prenom-${ClientValue.NrCompte}">${ClientValue.Prenom}</td>
        <td id="adresse-${ClientValue.NrCompte}">${ClientValue.Adresse}</td>
        <td id="somme-${ClientValue.NrCompte}" class="rouge">${ClientValue.Somme}</td>
        <td id="decouvert-${ClientValue.NrCompte}">${ClientValue.decouvert.toFixed(0)}</td>
        <td id="debit-${ClientValue.NrCompte}">${ClientValue.debit}</td>`;
        clientData.appendChild(infoClient);

        if (ClientValue.Somme < 0) {
            document.getElementById(`somme-${ClientValue.NrCompte}`).style.color = "red"
        }

        document.getElementById(`compte-${ClientValue.NrCompte}`).addEventListener("click", () => {
            modal.show();
            document.getElementById('labelAfficher').innerHTML = `Changer le numéro du compte : ${ClientValue.NrCompte}`;
            datatomodified = `compte-${ClientValue.NrCompte}`;

        });
        document.getElementById(`nom-${ClientValue.NrCompte}`).addEventListener("click", () => {
            modal.show();
            document.getElementById('labelAfficher').innerHTML = `Changer le nom : ${ClientValue.Nom}`;
            datatomodified = `nom-${ClientValue.NrCompte}`;

        });
        document.getElementById(`prenom-${ClientValue.NrCompte}`).addEventListener("click", () => {
            modal.show();
            document.getElementById('labelAfficher').innerHTML = `Changer le prénom : ${ClientValue.Prenom}`;
            datatomodified = `prenom-${ClientValue.NrCompte}`;

        });
        document.getElementById(`adresse-${ClientValue.NrCompte}`).addEventListener("click", () => {
            modal.show();
            document.getElementById('labelAfficher').innerHTML = `Changer l'adresse : ${ClientValue.Adresse}`;
            datatomodified = `adresse-${ClientValue.NrCompte}`;

        });
        document.getElementById(`somme-${ClientValue.NrCompte}`).addEventListener("click", () => {
            modal.show();
            document.getElementById('labelAfficher').innerHTML = `Ajouter une somme : ${ClientValue.Somme}`;
            datatomodified = `somme-${ClientValue.NrCompte}`;
        });
        document.getElementById(`decouvert-${ClientValue.NrCompte}`).addEventListener("click", () => {
            modal.show();
            document.getElementById('labelAfficher').innerHTML = `Modifier le découvert autorisé : ${ClientValue.decouvert.toFixed(0)}`;
            datatomodified = `decouvert-${ClientValue.NrCompte}`;
        });
        document.getElementById(`debit-${ClientValue.NrCompte}`).addEventListener("click", () => {
            modal.show();
            document.getElementById('labelAfficher').innerHTML = `Modifier le débit autorisé : ${ClientValue.debit}`;
            datatomodified = `debit-${ClientValue.NrCompte}`;

        });


    });

}
