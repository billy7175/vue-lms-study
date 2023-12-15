<script setup>
import { getTest } from "../apis/login";
import { onMounted } from "vue";
import NavMenu from "../components/NavMenu.vue";
import { useUserState } from "../stores/user.js";
const userState = useUserState();
const logout = () => {
  const isConfirmed = confirm("로그아웃 하시겠습니까?");
  if (isConfirmed) {
    userState.logoutUser();
  }
};

onMounted(async () => {
  console.log("#main.vue");
  await getTest();
});
</script>

<template>
  <div class="top-container">
    <NavMenu @logout="logout"></NavMenu>
    <div class="container__right ">
      <header class="header">
        <h1>this is a header section</h1>
      </header>
      <main class="main">
        <div class="main__inner">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.top-container {
  /* border: 1px solid red; */
  display:flex;
  width:90%;
  margin: 0 auto;
  height:100vh;
}
.container__right {
  width:100%;
}

.header {
  height:80px;
  display:flex;
  padding:20px;
  align-items: center;
}
.main {
  box-sizing:border-box;
  padding:20px;
  /* height:100%; */
  height:calc(100% - 80px);
  overflow-y:auto;
}


.main__inner {
  width: 100%;
  border: 1px solid rgb(127, 54, 54);
  padding: 20px;
  height: auto;
}


/* .main__inner {
  background:rgb(249, 249, 249);
  width:100%;
  height:auto;
  border-radius:10px;
  
} */
</style>