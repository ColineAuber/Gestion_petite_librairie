<script setup>
import { defineEmits, defineProps } from "vue";
// -- il faut déclarer les 2 params (props) du composant
defineProps(["livre", "indexl"]);
// -- les 3 events émis par ce composant
defineEmits(["deletel", "add1l", "delete1l"]);
</script>

<template>
  <li>
    {{ livre.pourAfficher }}
    <!-- au click sur le bouton, 
         on emet un événement dont on choisit le nom (ici deletel)
         la fonction qui gèrera cet event aura en paramètre la valeur de index
    -->
    <p id="space"></p>
    <button @click="$emit('deletel', livre.id)" id="bouton">
      <img src="./images/poubelle.png" alt="Supprimer" />
    </button>
    <p id="space"></p>
    <button @click="$emit('delete1l', livre)" id="bouton">
      <img src="./images/minus-one.png" alt="-1" />
    </button>
    <p id="space"></p>
    <button @click="$emit('add1l', livre)" id="bouton">
      <img src="./images/plus-one.png" alt="+1" />
    </button>
  </li>
</template>

<style>
#space {
  /* correspond à l'espace créé entre les boutons afin que ce soit plus esthétique */
  width: 10px;
  height: auto;
  display: inline-block;
}

#bouton {
  background-color: rgba(0, 0, 0, 0);
  border-style: none;
  border-left-style: none;
  cursor: pointer;
}

ul {
  /* afin de retirer les puces de la liste */
  list-style-type: none;
}
</style>