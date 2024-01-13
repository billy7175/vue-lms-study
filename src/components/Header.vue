<template>
  <header class="header">
    <h1></h1>
    <ul class="header__options">
      <li class="header__option" >  
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="text">{{ userName }} 님</span>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useUserState } from '../stores/user';
const userState = useUserState()

const userName = computed(() => {
  return userState.user.user?.name
}) 


</script>

<style scoped>
.header {
  height: 80px;
  display: flex;
  padding: 30px;
  padding-right: 100px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  background:var(--dark--background--light--color);
  border-radius: 6px;
}


.header__options {
  display:flex;
  align-items: center;
  gap:10px;
}

.header__option {
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text {
  color:var(--dark--font--color);
  font-weight: 700;
}
</style>
