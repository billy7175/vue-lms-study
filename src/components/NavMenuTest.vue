
<template>
  <div class="nav-menu-second card flex justify-content-center">
    <Menu :model="items" class="w-full md:w-15rem">
      <!-- <template #submenuheader="{ item }">
              <span class="text-primary font-bold">{{ item.label }}</span>
          </template> -->
      <!-- <template #item="{ item, props }">
              <a v-ripple class="flex align-items-center" v-bind="props.action">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                  <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                  <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
              </a>
          </template> -->

      <!-- <template #end>
              <button class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
                  <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
                  <span class="inline-flex flex-column">
                      <span class="font-bold">Amy Elsner</span>
                      <span class="text-sm">Admin</span>
                  </span>
              </button>
          </template> -->
      <template #item="{ item }">
        <a class="p-menuitem-link" @click="handleRoute(item)">
          <span class="p-menuitem-icon" :class="item.icon"> </span>
          <span>
            {{ item.label }}
          </span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" style="margin-left:10px;"/>
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
  setup() {
    const router = useRouter()

    const handleRoute = (item) => {
      console.log('#handleRoute',)
      const routeName = item.routeName
      console.log('#routeName', routeName)
      // alert('Set Route Path')
      router.push({ name: routeName})
    }
    const items = ref([
      {
        separator: true,
      },
      {
        label: "--__---__--__--__--",
        items: [
          {
            label: "Dashboard",
            icon: "pi pi-chart-bar",
            routeName: 'dashboard'
          },
          {
            label: "Assignment",
            icon: "pi pi-briefcase",
            routeName: 'assignments'
          },
          {
            label: "Vocabulary",
            icon: "pi pi-align-justify",
            routeName: 'vocabulary-list',
            badge: 'Beta'
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
      items
    }
  },
};
</script>

<style scoped>
.nav-menu-second .p-menu {

}

.p-menuitem-separator {
  margin: 0px !important;
  border: 1px solid red;
}
</style>
<style>
.nav-menu-second .p-menu {
  padding: 20px;
  background:#fff;
  background:#17181A;

}

.nav-menu-second .p-menuitem-separator {
  margin: 0px;
}

.nav-menu-second .p-menuitem {
  border-radius: 6px;
  margin:10px 0px;
}
.nav-menu-second .p-menuitem:hover {
  /* background: red; */
}

 .nav-menu-second .p-menuitem-link {
  font-weight: 500;
  color:#9d9191;
  color: #C6CCDA;
 }

 .nav-menu-second .p-menuitem-link:hover {
  background:red;
  background:transparent;
 }

.nav-menu-second .p-submenu-header {
  background:#17181A;
  color: #C6CCDA;
  padding:20px;
  background: #2A2B2D;
  margin-top:10px;
  border-radius: 6px;
}

.nav-menu-second .p-menuitem-separator {
  display: none;
}

.nav-menu-second .p-menuitem-link:hover {
  color:#10b981;
  color:#4f63d2;
  background:transparent;
}


.p-menuitem-content {
  background:none;
}


.nav-menu-second .p-menuitem-link:hover .p-menuitem-icon {
  color:#10b981;
  color: #1E3CEF;
  color: #4f63d2;
}

</style>