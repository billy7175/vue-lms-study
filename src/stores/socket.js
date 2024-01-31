import { defineStore } from "pinia";

export const useSocketState = defineStore("socket", {
  state: () => ({
    users: [{ test: "this is a test" }],
  }),
  getters: {
    gUsers: (state) => state.users,
  },
  actions: {
    getUsers() {
      return this.users;
    },
    setUsers(list = []) {
      this.users = [...list];
    },
  },
});
