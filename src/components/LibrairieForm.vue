<script setup>
import { defineEmits, defineProps } from "vue";
import { ref } from "vue";
// -- donnée réactive pour la saisie des attributs des livres
const titre = ref("");
const quantite = ref("");
const prix = ref("");
// -- les events émis par le composant
const emit = defineEmits(["addl"]);
// -- handler utile si on veut gérer le submit de cette manière
// <form @submit.prevent="handlerSubmit">
function handlerSubmit() {
  // en dehors du template il faut se souvenir que les attributs
  // sont des objets avec l'attribut value (créé par ref())
  emit("addl", titre.value, quantite.value, prix.value);
  titre.value = "";
}
</script>

<template>
  <!-- quand le formulaire est validé,
    on doit emmetre un event vers le composant parent 
    pour faire ressortir du composant 
    la valeur des variables "titre", "quantite", "prix";
  -->

  <form @submit.prevent="$emit('addl', titre, quantite, prix)" id="ajouter">
    <!-- 2ème syntaxe possible avec un handler
  <form @submit.prevent="handlerSubmit">
  -->
    <!-- la direective v-model permet de faire le lien bidirectionnel
         entre la variable et la zone de saisie ;
         si on modifie la var, la zone de saisie est modifié
         si on modifie la zone de saisir, la variable est modifié
         -->
    <input type="text" v-model="titre" placeholder="titre ?" id="champ" />
    <input type="int" v-model="quantite" placeholder="quantité ?" id="champ" />
    <input type="int" v-model="prix" placeholder="prix ?" id="champ" />
    <p id="space"></p>
    <button type="submit" id="bouton">
      <img src="./images/verifier.png" alt="Valider" />
    </button>
  </form>
</template>

<style scoped>
/* correspond au champ de recherche + au bouton */
#ajouter {
  text-align: center;
}

#bouton {
  /* correspond au bouton de validation de la recherche */
  background-color: rgba(171, 193, 204, 0.7);
  border: 2px solid #8099a6;
  cursor: pointer;
  height: 27px;
  width: 34px;
  position: relative;
  top: 1.5px;
  left: -6px;
}
#champ {
  /* correspond au champ de recherche */
  border: 2px solid #8099a6;
  font-family: "MV Boli", "Algerian", "sans-serif";
}
</style>