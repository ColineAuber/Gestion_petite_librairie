<script setup>
import { defineEmits, defineProps } from "vue";

// -- les events émis par le composant
const emit = defineEmits(["searchl"]);
// -- handler utile si on veut gérer le submit de cette manière
// <form @submit.prevent="handlerSubmit">
</script>

<template>
  <!-- quand le formulaire est validé,
    on doit emmetre un event vers le composant parent 
    pour faire ressortir du composant 
    les valeurs des variables "titre", "quantité" et "prix";
  -->
  <form @submit.prevent="$emit('searchl', motcle)" id="recherche">
    <input type="text" v-model="motcle" placeholder="rechercher ?" id="champ" />
    <button type="submit" id="bouton">
      <!-- le bouton ne sera plus un texte mais une image -->
      <img src="./images/verifier.png" alt="Valider" />
    </button>
  </form>
</template>

<style scoped>
#recherche {
  text-align: center;
  font-family: "French Script MT", "Algerian", "sans-serif";
  font-size: 25px;
  color: #644c1e;
  margin: 10px;
}

#bouton {
  background-color: rgba(171, 193, 204, 0.7);
  border: 2px solid #8099a6;
  cursor: pointer;
  height: 27px;
  width: 33px;
  position: relative;
  top: 2px;
  left: -2px;
  /* afin de coller le bouton validation au champ */
  /* la position relative permet de s'adapter à la taille de l'écran */
}
#champ {
  border: 2px solid #8099a6;
  font-family: "MV Boli", "Algerian", "sans-serif";
}
</style>