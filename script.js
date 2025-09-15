let btnAdd = document.getElementById("btn-add");
let intituleInput = document.getElementById("intitule");
let montantInput = document.getElementById("montant");
let categorie = document.getElementById("categorie");
let listeDepenses = document.getElementById("liste-dep");
let spanTotal = document.getElementById("total-dep");

const categoriesConfig = {
  alimentation: { emoji: "🍽️", label: "Alimentation", color: "success" },
  transport: { emoji: "🚗", label: "Transport", color: "primary" },
  loisirs: { emoji: "🎮", label: "Loisirs", color: "warning" },
  sante: { emoji: "⚕️", label: "Santé", color: "danger" },
  education: { emoji: "📚", label: "Éducation", color: "tertiary" },
  autres: { emoji: "📦", label: "Autres", color: "secondary" },
};

let listeVide = true;
let total = 0;

btnAdd.addEventListener("click", () => {
  if (
    !intituleInput.value.trim().length ||
    !montantInput.value.length ||
    !categorie.value.length
  ) {
    showErrorAlert();
    return;
  }
  if (listeVide == true) listeDepenses.innerHTML = "";

  listeVide = false;
  console.log(`${categoriesConfig[categorie.value]["emoji"]}`);

  let newBadge = document.createElement("ion-badge");
  newBadge.slot = "start";
  newBadge.textContent = `${categoriesConfig[categorie.value]["emoji"]} ${
    categoriesConfig[categorie.value]["label"]
  }`;
  newBadge.color = categoriesConfig[categorie.value]["color"];

  let newLabel = document.createElement("ion-label");
  newLabel.textContent = `${intituleInput.value} : ${montantInput.value}$`;

  let newItem = document.createElement("ion-item");
  newItem.appendChild(newBadge);
  newItem.appendChild(newLabel);

  let newIcon = document.createElement("ion-icon");
  newIcon.name = "close-outline";
  newIcon.slot = "end";
  newIcon.color = "danger";
  newItem.nidhal = montantInput.value;
  newIcon.addEventListener("click", () => {
    deleteHandler(newItem);
  });

  newItem.appendChild(newIcon);

  listeDepenses.appendChild(newItem);

  total += +montantInput.value;
  spanTotal.textContent = `${total} $`;
});

async function deleteHandler(itemToDelete) {
  const alert = document.createElement("ion-alert");
  alert.header = "Suppression";
  alert.message = "Que voulez-vous faire ?";
  alert.buttons = [
    {
      text: "Supprimer cette dépense",
      handler: () => {
        total = total - itemToDelete.nidhal;
        spanTotal.textContent = `${total} $`;
        listeDepenses.removeChild(itemToDelete);
      },
    },
    {
      text: "Supprimer toutes les dépenses",
      handler: () => {
        listeDepenses.innerHTML = `  <ion-item>
                  <ion-badge slot="start">💼 Aucune dépense</ion-badge>
                  <ion-label>Aucune dépense enregistrée</ion-label>
                </ion-item>`;
        total = 0;
        spanTotal.textContent = `${total} $`;
      },
    },
    {
      text: "Annuler",
      role: "cancel",
    },
  ];

  document.body.appendChild(alert);
  await alert.present();
}

async function showErrorAlert() {
  const alert = document.createElement("ion-alert");
  alert.header = "Erreur de saisie";
  alert.message = "Veuillez remplir les trois champs";
  alert.buttons = ["Ok"];

  document.body.appendChild(alert);
  await alert.present();
}
