<script setup>
import { ref, computed } from 'vue'
const letters =  [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  const selectedLetters =ref([]);

  function toggleLetter(letter) {
    // check if letter in letters array
    if (selectedLetters.value.includes(letter)) {
      //remove letter from selectedLetters.value array
      selectedLetters.value.splice(selectedLetters.value.indexOf(letter), 1);
    } else {
      //add letter to selectedLetters.value array
      selectedLetters.value.push(letter);
    }

  }


    const modifier = ref("");

    const solutions = computed(() => {
      const permutations = [];
      const permutation = [];
      const permute = (letters, permutation) => {
        if (permutation.length === letters.length) {
          permutations.push(permutation.slice().join(""));
        } else {
          for (let i = 0; i < letters.length; i++) {
            if (permutation.includes(letters[i])) {
              continue;
            }
            permutation.push(letters[i]);
            permute(letters, permutation);
            permutation.pop();
          }
        }
      };
      permute(selectedLetters.value, permutation);
      return permutations;

      })
</script>

<template>
  Add up to 6 letters, any more and you'll probably crash your browser ;)
  <div class="grid">
    <div
      v-for="letter in letters"
      v-bind:class="{ active: selectedLetters.includes(letter) }"
      @click="toggleLetter(letter)"
      :key="letter"
    >
      {{letter}}
    </div>
  </div>
  selected: {{selectedLetters}}
  <hr />

  {{solutions.length}} variations<br />
  <input v-model="modifier" placeholder="modifier ('er', 'est',' one', etc)" />
  <div class="grid">
    <div class="tag" v-for="tag in solutions" :key="tag">{{tag}}{{modifier}}</div>
  </div>
</template>

<style lang="scss">
.grid {
  display: grid;
  //grid min max auto 
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 1px;
  padding: 1rem;
  > div {
    border: 1px solid black;
    padding: 0.5em;
    &.active {
      background-color: #ccc;
    }
  }
}
.tag {
  padding: 0.5em;
  border-radius: 0.25em;
  border: 1px solid black;
}
</style>
