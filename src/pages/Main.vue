<script setup>
import NavMenu from '../components/NavMenu.vue'
</script>

<template>
  <NavMenu></NavMenu>
  <main class="main">
    <div class="main__inner">
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
.main__inner {
  width:100%;
  border:1px solid rgb(127, 54, 54);
  padding:20px;
  height:auto;
} 

</style>