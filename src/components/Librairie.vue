<script setup>
import { reactive, onMounted } from "vue";
import Livre from "../Livre.js";
import LibrairieForm from "./LibrairieForm.vue";
import LibrairieItem from "./LibrairieItem.vue";
import LibrairieSearch from "./LibrairieSearch.vue";

const listeL = reactive([]);

const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/4/livres";

function getLivre() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // -- vider la liste des livres
      listeL.splice(0, listeL.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Livre
      //  et l'ajouter dans la liste listeL
      dataJSON.forEach((l) =>
        listeL.push(new Livre(l.titre, l.qtestock, l.prix, l.id))
      );
    })
    .catch((error) => console.log(error));
}

function handlerDelete(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id du livre à supprimer doit être ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivre();
    })
    .catch((error) => console.log(error));
}

function handlerAdd(titre, qtestock, prix) {
  // -- il faut créer un nouveau "livre" instance de la classe

  console.log(titre, qtestock, prix);
  if (qtestock <= 0) {
    // Si la quantité est négative ou nulle, on force la quantité à 1
    qtestock = 1;
  }

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ titre: titre, qtestock: qtestock, prix: prix }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivre();
    })
    .catch((error) => console.log(error));
}

function handler1Add(l) {
  console.log(l);
  // -- ajouter 1 en quantité en stock
  l.add1l();
  // -- entête http pour la req AJAX
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(l),
  };
  // -- la req AJAX
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // actualiser la liste des livres
      getLivre();
    })
    .catch((error) => console.log(error));
}

function handler1Delete(l) {
  console.log(l);
  if (l.qtestock > 1) {
    // -- soustraire 1 de la quantité en stock
    l.delete1();
    // -- entête http pour la req AJAX
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // -- la chose modifiée est envoyé au serveur
    //  via le body de la req AJAX
    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(l),
    };
    // -- la req AJAX
    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        // actualiser la liste des livres
        getLivre();
      })
      .catch((error) => console.log(error));
  } else {
    handlerDelete(l.id);
    getLivre();
  }
}

function handlerSearch(motcle) {
  /* on récupère le mot clé nécessaire à la recherche */
  const fetchOptions = { method: "GET" };

  fetch(url + "?search=" + motcle, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      let livresTrouves = dataJSON;
      document.getElementById("recherche").innerHTML += "<ul>";
      /* on insère de l'html pour créer une liste de livre correspondant au critère*/
      for (let l of livresTrouves) {
        /* pour chaque livres, on récupère ses attributs et on l'incère dans l'html */
        document.getElementById("recherche").innerHTML +=
          "<li>" +
          l.titre +
          " coûte " +
          l.prix +
          "€ , il en reste " +
          l.qtestock +
          "</li>";
      }
      /* on oublie pas de fermer la liste */
      document.getElementById("recherche").innerHTML += "</ul>";
    })
    .catch((error) => console.log(error));
}

// -- fonction du cycle de vie du composant
// exécutée 1 seule fois à la création
onMounted(() => {
  getLivre();
});
</script>

<template>
  <h2>
    Rechercher un livre
    <p id="space"></p>
    <img src="./images/loupe.png" alt="livres" />
  </h2>
  <LibrairieSearch @searchl="handlerSearch" />

  <h2>
    Liste de livres
    <p id="space"></p>
    <img src="./images/pile-de-livres.png" alt="livres" />
  </h2>

  <ul id="texte">
    <LibrairieItem
      v-for="livre of listeL"
      :key="livre.id"
      :livre="livre"
      @deletel="handlerDelete"
      @add1l="handler1Add"
      @delete1l="handler1Delete"
    />
  </ul>
  <h2>
    Ajouter un livre
    <p id="space"></p>
    <img src="./images/livre_add.png" alt="livres" />
  </h2>
  <LibrairieForm @addl="handlerAdd"></LibrairieForm>
  <p id="space2"></p>
  <!-- On insère un espace pour que la barre pour ajouter
  un livre ne soit pas collé au bas de page fffdfb -->
  <img src="./images/BanniereFin1_bis.jpg" alt="livres" />
</template>

<style>
h2 {
  font-family: "Vladimir Script", "Algerian", "sans-serif";
  font-size: 40px;
  color: #e8d0a0;
  text-align: center;
  background-color: #fff3e4;
}

#texte {
  font-family: "French Script MT", "Algerian", "sans-serif";
  font-size: 25px;
  color: #644c1e;
  margin: 10px;
  text-align: center;
}

#space {
  width: 5px;
  height: auto;
  display: inline-block;
}

#space2 {
  height: 50px;
}

body {
  background-color: #fffffa;
}
</style>
