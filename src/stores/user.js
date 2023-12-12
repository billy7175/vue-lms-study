import { defineStore } from "pinia";

export const useUserState = defineStore("user", {
  state: () => ({
    user: null,
    isLoggedIn: false,
    test:'testtasd'
  }),
  actions: {
    loginUser(data) {
      console.log('#actions-loginUser', data)
      this.user = {
        ...data
      };
      
    },
  },
});
