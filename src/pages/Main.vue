<script setup>
import NavMenu from '../components/NavMenu.vue'
import { useUserState } from "../stores/user.js";
const userState = useUserState()
const logout = () => {
  const isConfirmed = confirm('로그아웃 하시겠습니까?')
  if(isConfirmed){
    userState.logoutUser()
  } 
}
</script>

<template>
  <NavMenu @logout="logout"></NavMenu>
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