
<template>
  <div class="g-menu flex">
    <Menu :model="items" class="menu custom-menu">
      <template #start>
        <h1 class="logo">
          <a>LES</a>
        </h1>
      </template>
      <template #item="{ item }">
        <a :class="[{ 'is-matched': pathArray.includes(item.routeName) }]" class="p-menuitem-link"
          @click="handleRoute(item)">
          <span class="p-menuitem-icon" :class="item.icon"> </span>
          <span>
            {{ item.label }}
          </span>
          <!-- <Badge v-if="item.badge" class="ml-auto" :value="item.badge" style="margin-left: 10px" /> -->
        </a>
      </template>
    </Menu>
  </div>
</template>


<!-- handleRoute -->
<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup(props, context) {
    const route = useRoute()
    const router = useRouter()
    const routeName = computed(() => { return route })
    const pathArray = computed(() => { return route.fullPath.split('/') })

    const handleRoute = (item) => {
      if (item.label === "Logout") return context.emit("logout");
      const routeName = item.routeName;
      return router.push({ name: routeName });
    };
    const items = ref([
      {
        separator: true,
      },
      {
        label: "Home",
        items: [
          {
            label: "Dashboard",
            icon: "pi pi-chart-bar",
            routeName: "dashboard",
          },
          {
            label: "Casual Talk",
            icon: "pi pi-pencil",
            routeName: "casualtalk",
          },
          {
            label: 'Assignment',
            icon: 'pi pi-book',
            routeName: 'assignments'
          },
          {
            label: "Vocabulary",
            icon: "pi pi-language",
            routeName: "vocabulary",
            badge: "Beta",
          },
          {
            label: "Students",
            icon: "pi pi-users",
            routeName: "students",
            badge: "5",
          },
          {
            label: "Payment",
            icon: "pi pi-money-bill",
            routeName: "pay-management",
          },
        ],
      },
      {
        label: "__--__--__--__-",
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
      routeName,
      handleRoute,
      items,
      pathArray
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../src/assets/styles/mixins.scss';

.logo {
  text-align: center;
}

.g-menu {
  ::v-deep(.p-menu) {
    border: none;
    padding: 15px;
    background: #fdfdf9;
  }

  ::v-deep(.p-menuitem) {
    border-radius: 6px;
    margin: 10px 0px;

    &.p-focus {
      color: #4b5563;
      background: #f3f4f6;
      transition: all .5;

      .p-menuitem-content {
        background: none;

        // &:hover {
        //   background: none;
        //   background: blue;
        // }
      }
    }
  }

  ::v-deep(.p-menuitem.p-focus) {
    // color: red;
  }


  ::v-deep(.p-menuitem-link) {
    font-weight: 500;
    color: #9d9191;
    color: var(--font--color);
  }

  ::v-deep(.p-submenu-header) {
    padding: 20px;
    color: var(--font--color);
    margin-top: 10px;
    border-radius: 6px;
    color: #444;
    font-weight: 400;
    color: var(--font--color__hover);
    background: none;
    backdrop-filter: blur(8px);
  }

  ::v-deep(.p-menuitem-separator) {
    display: none;
  }

  ::v-deep(.p-menuitem-link) {
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;

    &.is-matched {
      color: #4b5563;
      background: #f3f4f6;
      transition: all .5;

      .p-menuitem-icon {
        color: var(--font--color__hover);
      }

    }


    &:hover {
      background: transparent;
      color: var(--font--color__hover);
    }

    &:hover .p-menuitem-icon {
      color: var(--font--color__hover);
    }
  }

  ::v-deep(.p-menuitem-content) {
    &:hover {}
  }
}

@keyframes shine {
  from {
    -webkit-mask-position: 150%;
  }

  to {
    -webkit-mask-position: -50%;
  }
}
</style>
