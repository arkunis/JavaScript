let personne;
let data2;
let pasvac;
let ticketrest;
function init() {
    personneL();
    document.getElementById('valider').addEventListener('click', () => {
        data2.data(document.getElementById('text').value).draw();
        modal.hide();
    })

    const targetEl = document.getElementById('default-modal');

    // options with default values
    const options = {
        placement: 'center',
        backdrop: 'dynamic',
        closable: true,
        onHide: () => {
            // console.log('modal is hidden');
        },
        onShow: () => {
            // console.log('modal is shown');
        }
    };

    const modal = new Modal(targetEl, options);
    document.getElementById('fermer').addEventListener('click', () => { modal.hide() });


    const table = $('#TableEmploye').DataTable({
        columns: [
            {
                class: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: ''
            },
            { data: 'agence.NomAgence' },
            { data: 'nom' },
            { data: 'prenom' },
            {
                data: 'annee()',
                createdCell: function (td, annee) {
                    if (annee < 1) {
                        $(td).css('color', 'red')
                    } else if (annee < 10) {
                        $(td).css('color', 'orange')
                    } else {
                        $(td).css('color', 'green')
                    }
                }
            },
            { data: 'fonction' },
            {
                data: 'salaireK',
                createdCell: function (td, salaireK) {
                    if (salaireK < 1000) {
                        $(td).css('color', 'red')
                    } else if (salaireK < 20000) {
                        $(td).css('color', 'orange')
                    } else {
                        $(td).css('color', 'green')
                    }
                }
            },
            { data: 'service' },
            {
                data: 'enfant.length',
                createdCell: function (td, enfant) {
                    if (enfant < 1) {
                        $(td).css('color', 'red')
                    } else {
                        $(td).css('color', 'green')
                    }
                }
            }
        ],
        data: personne,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/fr-FR.json'
        },
        "columnDefs": [
            { className: "none", "targets": [0] }
        ]
    });

    // Table Details 
    function format(d) {
        if (d.agence.Restaurant() === true) {
            ticketrest = d.nom + " " + d.prenom + " a accès au ticket restaurant";
        } else {
            ticketrest = d.nom + " " + d.prenom + " n'a pas accès au ticket restaurant";
        };
        if (d.vacance() == true) {
            pasvac = d.nom + " " + d.prenom + " a accès au chèques vacance";
        } else {
            pasvac = d.nom + " " + d.prenom + " n'a pas accès au chèques vacance";
        };

        function okEnfant() {
            if (d.enfant != "") {
                let gDenfant = "";
                for (let i = 0; i < d.enfant.length; i++) {
                    gDenfant += `${d.enfant[i].nom} ${d.enfant[i].prenom}  agée de ${d.enfant[i].anneeEnfant()}  an(s) <hr> Ticket noël : ${d.enfant[i].ticketNoel()} <hr>`;
                }
                return gDenfant;
            } else {
                return "";
            }
        }

        return (
            'Nom de l\'agence : ' + d.agence.NomAgence + '<hr> Nom, prénom : ' + d.nom + ' ' + d.prenom + '<hr>' + 'Un salaire annuel de : ' + d.salaireK + '€ <hr>' + d.annee() + ' Année(s) dans l\'entreprise <hr> Fonction : ' +
            d.fonction + '<hr>Service : ' + d.service + '<hr>' + ticketrest + '<hr>' + pasvac + '<hr>  Nombre d\'enfant(s) : ' + d.enfant.length + '<hr>' + okEnfant()

        );
    }

    // Array to track the ids of the details displayed rows
    const detailRows = [];

    table.on('click', 'tbody td.dt-control', function () {
        let tr = event.target.closest('tr');
        let row = table.row(tr);
        let idx = detailRows.indexOf(tr.id);

        if (row.child.isShown()) {
            tr.classList.remove('details');
            row.child.hide();

            // Remove from the 'open' array
            detailRows.splice(idx, 1);
        }
        else {
            tr.classList.add('details');
            row.child(format(row.data()), "none").show();

            // Add to the 'open' array
            if (idx === -1) {
                detailRows.push(tr.id);
            }
        }
    });

    // On each draw, loop over the `detailRows` array and show any child rows
    table.on('draw', () => {
        detailRows.forEach((id, i) => {
            let el = document.querySelector('#' + id + 'td.dt-control');

            if (el) {
                el.dispatchEvent(new Event('click', { bubbles: true }));
            }
        });
    });

    // //

    $('#TableEmploye').on('click', 'td:not(.none)', function () {
        var table = $('#TableEmploye').DataTable();
        var data = table.cell(this).data(); //Pour la cellule
        data2 = table.cell(this);
        // var data = table.row(this).data(); // Pour la ligne
        document.getElementById('text').value = "";
        document.getElementById('title').innerHTML = data;
        document.getElementById('labelText').innerHTML = `Changement sur : ${data}`;
        modal.show()
    })
}


function personneL() {

    let david = new Enfant("Hubert", "David", "1998-5-5");
    let lucie = new Enfant("Bernard", "lucie", "2018-6-28");
    let lucille = new Enfant("Bernard", "lucille", "2005-6-28");
    let eugene = new Enfant("Cailloux", "Eugène", "2022-4-8");
    let eustache = new Enfant("Cailloux", "eustache", "2015-2-11");

    let lowcost = new Agence("Lowcost", false);
    let amundi = new Agence("Amundi", true);

    let christine = new Employe(lowcost, "Hubert", "Christine", "2023-11-08", "secretaire", 15000, "commercial", [david]);
    let gil = new Employe(amundi, "Bernard", "Gil", "2016-11-6", "mechanicien", 32000, "mechanique", [lucie, lucille]);
    let amelie = new Employe(amundi, "Ouesh", "Amelie", "1902-1-1", "femme de menage", 25, "entretient");
    let pierre = new Directeur(lowcost, "Cailloux", "Pierre", "1986-11-6", "directeur", 55555, "direction", [eugene, eustache]);

    personne = [christine, gil, amelie, pierre];

    let selectedOption = "prenom";
    personne.sort((a, b) => {
        return a[selectedOption].localeCompare(b[selectedOption]);
    });

    // console.log("Il y a actuellement " + personne.length + " personnes dans l'entreprise :")
    // console.log("");

    personne.forEach(function (gens) {

        // gens.AnneePlus1();
        // gens.AnneePlus1();
        // console.log('+ ' + gens.salaire() + "€ Pour " + gens.prenom);
        // console.log("l'agence : " + gens.agence.NomAgence + " a " + gens.nom + " " + gens.prenom + " depuis " + gens.annee() + " an(s) dans l'entreprise en tant que " + gens.fonction + " et gagne " + gens.salaireK + " €");
        // if (gens.enfant != "") {
        //     for (let i = 0; i < gens.enfant.length; i++) {
        //         console.log("Enfant(s) : " + gens.enfant[i].nom + " " + gens.enfant[i].prenom + " agée de " + gens.enfant[i].anneeEnfant() + " an(s)");
        //         console.log(gens.enfant[i].ticketNoel());
        //     }
        // }
    });
}
