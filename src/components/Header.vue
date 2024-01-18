<template>
  <header class="header">
    <h1></h1>
    <ul class="header__options">
      <li class="header__option" >  
        <el-avatar
          :size="30"
          src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
        />
        <span class="text">{{ userName }} 님 </span>
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
  border-radius: 6px;
  background: #fff;
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
  color:var(--font--color);
  font-weight: 700;
}
</style>
