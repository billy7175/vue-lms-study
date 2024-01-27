<script setup>
</script>

<template>
  <div class="app">
    <cube></cube>
    <router-view></router-view>
  </div>
</template>


<script>
import { io } from "socket.io-client";
import { onMounted } from "vue";
import Cube from "./components/cube/Cube.vue";
import { useUserState } from "./stores/user";
export default {
  components: {
    Cube,
  },
  setup() {
    const userState = useUserState();

    onMounted(() => {
      const socket = io("http://127.0.0.1:3000", {
        transports: ["websocket"],
      });

      socket.on("connect", (res) => {
        console.log(res);
        console.log("Connected to server12312312");
      });

      const loggedInUser = userState.user?.user;
      socket.emit("join", loggedInUser, console.log, (error) => {
        console.log("#error", error);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
        socket.emit("disconnect", loggedInUser);
      });

      socket.on("message", (message) => {
        console.log(message);
      });
    });
    return {};
  },
};
</script>

<style scoped>

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
