<script>
</script>

<template>
  <el-menu
    :router="true"
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#f4f4f4"
    text-color="#241a37"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group title="관리자">
        <el-menu-item index="dashboard" :route="{ name : 'dashboard' }">대시보드</el-menu-item>
        <el-menu-item index="assignments" :route="{ name : 'assignments' }">과제 생성</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="사용자">
        <el-menu-item index="mypage">My Page</el-menu-item>
        <el-menu-item index="user-assignments">과제 풀기</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>준비중...</template>
        <el-menu-item index="1-4-1">준비중-01...</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu>
      <template #title>
        <el-icon><location /></el-icon>
        <span>Setting</span>
      </template>
      <el-menu-item @click="$emit('logout')">로그아웃</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>