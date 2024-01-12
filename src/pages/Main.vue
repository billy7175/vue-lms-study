<script setup>
import { getTest } from "../apis/login";
import { onMounted } from "vue";
import NavMenu from "../components/NavMenu.vue";
import NavMenuTest from '../components/NavMenuTest.vue'
import { useUserState } from "../stores/user.js";
import Header from "../components/Header.vue";
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

const items = [
  {
    label: "File",
    icon: "pi pi-fw pi-file",
    items: [
      {
        label: "New",
        icon: "pi pi-fw pi-plus",
        items: [
          {
            label: "Bookmark",
            icon: "pi pi-fw pi-bookmark",
          },
          {
            label: "Video",
            icon: "pi pi-fw pi-video",
          },
        ],
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
      },
      {
        label: "Export",
        icon: "pi pi-fw pi-external-link",
      },
    ],
  },
  {
    label: "Edit",
    icon: "pi pi-fw pi-pencil",
    items: [
      {
        label: "Left",
        icon: "pi pi-fw pi-align-left",
      },
      {
        label: "Right",
        icon: "pi pi-fw pi-align-right",
      },
      {
        label: "Center",
        icon: "pi pi-fw pi-align-center",
      },
      {
        label: "Justify",
        icon: "pi pi-fw pi-align-justify",
      },
    ],
  },
  {
    label: "Users",
    icon: "pi pi-fw pi-user",
    items: [
      {
        label: "New",
        icon: "pi pi-fw pi-user-plus",
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-user-minus",
      },
      {
        label: "Search",
        icon: "pi pi-fw pi-users",
        items: [
          {
            label: "Filter",
            icon: "pi pi-fw pi-filter",
            items: [
              {
                label: "Print",
                icon: "pi pi-fw pi-print",
              },
            ],
          },
          {
            icon: "pi pi-fw pi-bars",
            label: "List",
          },
        ],
      },
    ],
  },
  {
    label: "Events",
    icon: "pi pi-fw pi-calendar",
    items: [
      {
        label: "Edit",
        icon: "pi pi-fw pi-pencil",
        items: [
          {
            label: "Save",
            icon: "pi pi-fw pi-calendar-plus",
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-calendar-minus",
          },
        ],
      },
      {
        label: "Archieve",
        icon: "pi pi-fw pi-calendar-times",
        items: [
          {
            label: "Remove",
            icon: "pi pi-fw pi-calendar-minus",
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <div class="main-component">
    <PanelMenu :model="items" style="display: none" />
    <NavMenu style="width: 250px" @logout="logout"></NavMenu>
    <NavMenuTest></NavMenuTest>
    <div class="container__right">
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
.main-component {
  display: flex;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
}
.container__right {
  width: 100%;
  width: cal(100% - 250px);
  /* width:1200px; */
}

.main {
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
  height: calc(100% - 80px);
}

.main__inner {
  width: 100%;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  overflow-x: auto;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
}
</style>
<!-- <style>
.main-component .el-sub-menu__title {
  font-weight: 700;
  color:#6c757d;
  font-size:14px;
}


.main-component .el-menu-item {
  font-weight: 500;
  color: #495057;
  font-size:14px;
}
</style> -->