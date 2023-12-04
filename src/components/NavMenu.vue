<script>
</script>

<template>
  <el-menu
    :router="true"
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group title="관리자">
        <el-menu-item index="1-1">대시보드</el-menu-item>
        <el-menu-item index="1-2">과제 생성</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="사용자">
        <el-menu-item index="1-3">My Page</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title>준비중...</template>
        <el-menu-item index="1-4-1">준비중-01...</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>