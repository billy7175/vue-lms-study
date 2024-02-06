import { defineStore } from "pinia";
import VueCookies from "vue-cookies";

export const useUserState = defineStore("user", {
  state: () => ({
    user: null,
    isLoggedIn: false,
    test: "testtasd",
  }),
  actions: {
    loginUser(data) {
      console.log("#actions-loginUser", data);
      this.user = {
        ...data,
      };
    },
    logoutUser() {
      VueCookies.remove("user");
      VueCookies.remove("token");
      location.reload();
    },
  },
});
