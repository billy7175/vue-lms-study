<script setup>
import NavMenu from './components/NavMenu.vue' 
</script>

<template>
  <div id="app">
    
    <NavMenu></NavMenu>


    <main class="main">
      <div class="main__inner"></div>
    </main>
  </div>
</template>

<style scoped>
#app {
  /* border:1px solid red; */
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
