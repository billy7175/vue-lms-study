<script setup>
import { getTest } from "../apis/login";
import { onMounted } from "vue";
import NavMenu from "../components/NavMenu.vue";
import { useUserState } from "../stores/user.js";
import Header from '../components/Header.vue'
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
    <NavMenu 
    style="width:250px;"
    @logout="logout"></NavMenu>
    <div class="container__right ">
      <Header></Header>
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
  display:flex;
  width:100%;
  margin: 0 auto;
  height:100vh;

}
.container__right {
  width:100%;
  width:cal(100% - 250px);
  /* width:1200px; */
}

.main {
  box-sizing:border-box;
  padding:30px;
  width:100%;
  /* width:calc(100% - 0px); */
  height:calc(100% - 80px);
  
}


.main__inner {
  width: 100%;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  overflow-x:auto;
  padding: 20px;
  /* height: auto; */
  /* height:calc(100% - 80px); */
  overflow-y:auto; 
  height:100%;
}


/* .main__inner {
  background:rgb(249, 249, 249);
  width:100%;
  height:auto;
  border-radius:10px;
  
} */
</style>