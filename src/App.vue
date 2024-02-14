<script setup>
</script>

<template>
  <div class="app">
    <!-- <button @click="open">add</button> -->
    <!-- <button @click="close">close</button> -->
    <test></test>
    <cube></cube>
    <router-view></router-view>
  </div>
</template>


<script>
import Test from './components/Test.vue'
import { onMounted, reactive, ref } from "vue";
import Cube from "./components/cube/Cube.vue";
import { useUserState } from "./stores/user";
import { useSocketState } from "./stores/socket";
import useSocketIO from '../src/socket/index'
export default {
  components: {
    Cube,
    Test
  },
  setup(props, context, test) {
    const { socket } = useSocketIO()
    const userState = useUserState();
    const socketState = useSocketState()
    const testBrowser = reactive({})
    // const myWindow = ref(null);
    // const open = () => {
    //   myWindow.value = window.open("http://www.naver.com", "_blank");
    // };
    // const close = () => {
    //   setTimeout(() => {
    //     myWindow.value.close();
    //   }, 3000);
    // };

    let myWindow;
    const open = () => {
      myWindow = window.open("http://www.naver.com", "_blank");
    };
    const close = () => {
      setTimeout(() => {
        myWindow.close();
      }, 1000);
    };

    const openAndClose = () => {
      const googleWindow = window.open("https://www.google.com", "_blank");

      setTimeout(() => {
        console.log(googleWindow)
        if (googleWindow && !googleWindow.closed) {
          googleWindow.close();
        }
      }, 3000);
    };


    onMounted(() => {
      // open()

      socket.on("connect", (res) => {
        console.log("Connected to server12312312");
      });

      const loggedInUser = userState.user?.user;
      socket.emit("join", {
        ...loggedInUser,
        isActive: true
      }, console.log, (error) => {
        console.log("#error", error);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
        socket.emit("disconnect", loggedInUser);
      });

      socket.on("message", (message) => {
        console.log(message);
      });



      socket.emit('userlist', () => {
      })

      socket.on('userlist', (res) => {
        console.log('#FROM APP', res)
        const users = [...res]
        socketState.setUsers(users)
      })




      // Check if the Page Visibility API is supported by the browser
      if ('hidden' in document) {
        var visibilityState = document.hidden ? 'hidden' : 'visible';
        console.log('Initial visibility state: ' + visibilityState);

        // Add event listener for visibility changes
        document.addEventListener('visibilitychange', function () {
          visibilityState = document.hidden ? 'hidden' : 'visible';
          console.log('Visibility state changed to: ' + visibilityState);

          // You can perform actions based on visibility state here
          if (visibilityState === 'visible') {
            // User is looking at the tab
            console.log('User is looking at the tab.');
            socket.emit('online', true)

          } else {
            // User is not looking at the tab
            console.log('User is not looking at the tab.');
            socket.emit('offline', false)
          }
        });
      } else {
        console.log('Page Visibility API not supported by the browser.');
      }


    });
    return {
      open,
      close,
      openAndClose
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../src/assets/styles/mixins.scss';

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

::v-deep(.p-breadcrumb) {
  // @include glassmorphism(1px);
  padding: 10px;
}
</style>
