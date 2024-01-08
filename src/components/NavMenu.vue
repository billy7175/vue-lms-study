<script>
</script>

<template>
  <div class="nav-menu">
    <h1 style="color: #6dd58c; text-align: center; font-size:22px;">LES School</h1>
    <el-menu
      :router="true"
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#f4f4f4"
      text-color="#241a37"
      >
      <!-- @open="handleOpen" -->
      <!-- @close="handleClose" -->
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="관리자">
          <el-menu-item index="dashboard" :route="{ name: 'dashboard' }"
            >대시보드</el-menu-item
          >
          <el-menu-item index="assignments" :route="{ name: 'assignments' }"
            >과제 생성</el-menu-item
          >
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
      <el-sub-menu index="2">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Setting</span>
        </template>
        <el-menu-item @click="$emit('logout')">로그아웃</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style>
.nav-menu .el-menu {
  background: none;
}
.nav-menu .el-menu-item:hover {
  background: #ddf4ff;
  border: 1px solid #7fcfff;
  color:#1cb0f6;
}
.nav-menu .el-sub-menu__title {
  font-weight: 700;
  color: #6c757d;
  font-size: 14px;
  /* margin:10px; */

}

.nav-menu .el-sub-menu__title:hover {
  background: #ddf4ff;
  outline: 1px solid #7fcfff;
}

.nav-menu .el-menu-item {
  font-weight: 500;
  color: #495057;
  font-size: 14px;
  margin: 10px;
}
.nav-menu .el-menu-item.is-active {
  background: #ddf4ff;
  border: 1px solid #7fcfff;
  color:#1cb0f6;
}
</style>