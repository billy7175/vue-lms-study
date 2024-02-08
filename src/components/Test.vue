<template>
  <div>
    <!-- asd {{ $alert() }} -->
  </div>
</template>


<script setup>
import { inject } from 'vue'

const global = inject('$alert')

console.log('#global')
console.log(global)


// console.log(i18n.greetings.hello)
</script>