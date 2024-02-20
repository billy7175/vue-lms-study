<script setup>
import { onMounted } from "vue";
import NavMenuTest from '../components/NavMenuTest.vue'
import { useUserState } from "../stores/user.js";
import Header from "../components/Header.vue";
import { MessageBox } from 'billy-ui'
const userState = useUserState();
const logout = async () => {
  const isConfirmed = await MessageBox.confirm('로그아웃 하시겠습니까?')
  if (isConfirmed) {
    userState.logoutUser();
  }
};

</script>

<template>
  <div class="main-component">
    <NavMenuTest @logout="logout"></NavMenuTest>
    <div class="container__right">
      <!-- <Header></Header> -->
      <main class="main">
        <div class="main__inner">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.main-component {
  display: flex;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  gap: 10px;
}

.container__right {
  width: 100%;
  width: cal(100% - 250px);
}

.main {
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: calc(100%);
}

.main__inner {
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
}
</style>