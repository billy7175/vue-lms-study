<template>
  <header class="header">
    <Breadcrumb :home="home" :model="items">
      <template #item="item">
        <a class="breadcrumb-item" @click="handleClick(item)" :href="item.url">
          <span :class="item.icon">{{ item.label }}</span>
        </a>
      </template>
      <template #separator> > </template>
    </Breadcrumb>
    <ul class=" header__options">
      <li class="header__option">
        <el-avatar :size="30" src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png" />
        <span class="text">{{ userName }} 님 </span>
      </li>
    </ul>
  </header>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue'
import { useUserState } from '../stores/user';



export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const breadcrumbs = computed(() => {
      return route.meta?.breadcrumbs || []
    })
    const userState = useUserState()
    const userName = computed(() => {
      return userState.user.user?.name
    })

    const handleClick = (item) => {
      return router.push({ name: item.item.name })
    }

    return {
      handleClick,
      userName,
      userState,
      items: breadcrumbs
    }
  }
}


</script>

<style lang="scss" scoped>
@import '../../src/assets/styles/mixins.scss';

.header {
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  display: flex;
  border-radius: 6px;
  border-radius: 10px;
  background: #fff;
  margin: 0px 20px;
}

.header__options {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__option {
  display: flex;
  margin-left: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text {
  color: var(--font--color);
  font-weight: 700;
}

.breadcrumb-item {
  cursor: pointer;
  color: #009;
  color: #6b7280;
  font-size: 14px;
  font-weight: 700;
}
</style>
