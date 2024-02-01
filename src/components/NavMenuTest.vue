
<template>
  <div class="nav-menu-second card flex justify-content-center">
    <Menu :model="items" class="w-full md:w-15rem">
      <template #start>
        <h1 class="logo">
          <a>LES School</a>
        </h1>
      </template>
      <template #item="{ item }">
        <a class="p-menuitem-link" @click="handleRoute(item)">
          <span class="p-menuitem-icon" :class="item.icon"> </span>
          <span>
            {{ item.label }}
          </span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" style="margin-left: 10px" />
        </a>
      </template>
    </Menu>
  </div>
</template>


<!-- handleRoute -->
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup(props, context) {
    const router = useRouter();

    const handleRoute = (item) => {
      if (item.label === "Logout") return context.emit("logout");
      const routeName = item.routeName;
      router.push({ name: routeName });
    };
    const items = ref([
      {
        separator: true,
      },
      {
        label: "APP",
        items: [
          {
            label: "Dashboard",
            icon: "pi pi-chart-bar",
            routeName: "dashboard",
          },
          {
            label: "Assignment",
            icon: "pi pi-briefcase",
            routeName: "assignments",
          },
          {
            label: "Vocabulary",
            icon: "pi pi-align-justify",
            routeName: "vocabulary-list",
            badge: "Beta",
          },
          {
            label: "Students",
            icon: "pi pi-users",
            routeName: "students",
            badge: "5",
          },
        ],
      },
      {
        label: "__--__--__--__--__",
        items: [
          {
            label: "Settings",
            icon: "pi pi-cog",
          },
          {
            label: "Messages",
            icon: "pi pi-inbox",
          },
          {
            label: "Logout",
            icon: "pi pi-sign-out",
          },
        ],
      },
    ]);

    return {
      handleRoute,
      items,
    };
  },
};
</script>

<style scoped>
.logo {
  color: #308d2d;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 6px;
  display: inline-block;
  position: relative;
  font-size: 22px;
  -webkit-mask-image: linear-gradient(-75deg,
      rgba(30, 128, 39, 0.6) 30%,
      #ac48a3 50%,
      rgba(211, 7, 163, 0.6) 70%);
  -webkit-mask-size: 200%;
  animation: shine 2s linear infinite;
}

@keyframes shine {
  from {
    -webkit-mask-position: 150%;
  }

  to {
    -webkit-mask-position: -50%;
  }
}

.p-menuitem-separator {
  margin: 0px !important;
  border: 1px solid red;
}
</style>
<style>
.nav-menu-second .p-menu {
  padding: 20px;
  background: var(--background--light--color);
}

.nav-menu-second .p-menuitem.p-focus {
  background: var(--background--color__hover);
}

.p-menuitem.p-focus .p-menuitem-icon {
  color: #000;
}

.nav-menu-second .p-menuitem-separator {
  margin: 0px;
}

.nav-menu-second .p-menuitem {
  border-radius: 6px;
  margin: 10px 0px;
}

.nav-menu-second .p-menuitem-link {
  font-weight: 500;
  color: #9d9191;
  color: var(--font--color);
}

.nav-menu-second .p-submenu-header {
  padding: 20px;
  color: var(--font--color);
  margin-top: 10px;
  border-radius: 6px;
}

.nav-menu-second .p-menuitem-separator {
  display: none;
}

.nav-menu-second .p-menuitem-link {
  border-radius: 6px;
}

.nav-menu-second .p-menuitem-link:hover {
  background: transparent;
  color: var(--font--color__hover);
  background: var(--background--color__hover);
}

.p-menuitem-content {
  background: none;
}

.nav-menu-second .p-menuitem-link:hover .p-menuitem-icon {
  color: #fff;
  color: var(--font--color__hover);
}
</style>