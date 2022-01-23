<script setup>
import { ref, computed } from "vue";
import getAnagrams from "./js/anagram.js";
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const selectedLetters = ref([]);

function removeLetter(letter) {
  selectedLetters.value.splice(selectedLetters.value.indexOf(letter), 1);
}
function addLetter(letter) {
  //add letter to selectedLetters.value array
  selectedLetters.value.push(letter);
}
const selectedFont = ref("");
const modifier = ref("");

const solutions = computed(() => {
  const permutations = getAnagrams(selectedLetters.value);
  return permutations;
});
</script>

<template>
  <div class="grid">
    <div
      v-for="(letter, i) in letters"
      v-bind:class="{ active: selectedLetters.includes(letter) }"
      :key="`${letter}${i}`"
    >
      <button
        @click="removeLetter(letter)"
        :disbaled="selectedLetters.includes(letter)"
      >
        -
      </button>
      <span>{{ letter }}</span>
      <button @click="addLetter(letter)" :disabled="selectedLetters.length > 6">
        +
      </button>
    </div>
  </div>

  <hr />
  <template v-if="selectedLetters.length">
    {{ solutions.length }} variations<br />
    <input
      v-model="modifier"
      placeholder="modifier ('er', 'est',' one', etc)"
    />
    <select v-model="selectedFont">
      <option value="">Default</option>
      <option value="tag">Tag</option>
      <option value="throw">Throw</option>
    </select>
    <div class="grid">
      <div class="preview" v-for="tag in solutions" :key="tag">
        <span :class="selectedFont">{{ tag }}{{ modifier }}</span>
      </div>
    </div>
  </template>
</template>

<style lang="scss">
@font-face {
  font-family: "Throw-up Font";
  src: url("./assets/fonts/Throw-up-Font.eot");
  src: url("./assets/fonts/Throw-up-Font.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/Throw-up-Font.woff2") format("woff2"),
    url("./assets/fonts/Throw-up-Font.woff") format("woff"),
    url("./assets/fonts/Throw-up-Font.ttf") format("truetype"),
    url("./assets/fonts/Throw-up-Font.svg#Throw-up Font") format("svg");
}
@font-face {
  font-family: "aAnotherTag";
  src: url("./assets/fonts/aAnotherTag.eot");
  src: url("./assets/fonts/aAnotherTag.eot?#iefix") format("embedded-opentype"),
    url("./assets/fonts/aAnotherTag.woff2") format("woff2"),
    url("./assets/fonts/aAnotherTag.woff") format("woff"),
    url("./assets/fonts/aAnotherTag.ttf") format("truetype"),
    url("./assets/fonts/aAnotherTag.svg#aAnotherTag") format("svg");
}

button {
  border: 1px solid black;
  background: none;
  color: black;
}
.grid {
  display: grid;
  //grid min max auto
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0.5rem;
  padding: 1rem 0;
  > div {
    border: 1px solid black;
    display: flex;
    align-items: center;
    text-align: center;
    * {
      flex: 1;
    }
    &.active {
      background-color: #ccc;
    }
  }
}

.preview {
  padding: 2rem;
  border-radius: 0.25em;
  border: 1px solid black;
  text-transform: capitalize;
  font-size: 2rem;
  .tag {
    font-family: "aAnotherTag";
    font-size: 2em;
  }
  .throw {
    font-family: "Throw-up Font";
    font-size: 2em;
  }
}
</style>
