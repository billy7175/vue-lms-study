import { createVNode, render, createApp } from "vue";
import MessageBox from "./MessageBox.vue";

export default {
  vnodes: [],
  create(
    message = "This feature is being tested right now.",
    { useHtml = false } = {}
  ) {
    console.log("#before - newVnode");
    const container = document.createElement("div");
    return new Promise((resolve) => {
      const newVnode = createVNode(MessageBox, {
        class: "global-alert",
        useHtml: useHtml,
        label: message,
        onConfirm: async () => {
          // Handle confirm action here if needed
          await this.deleteVNode(newVnode);
          resolve(true);
        },
        onCancel: async () => {
          // Handle cancel action here if needed
          this.deleteVNode(newVnode);
          await resolve("this is a false");
        },
        onDelete: () => {
          this.deleteVNode(newVnode);
        },
      });
      this.vnodes.push(newVnode);
      render(newVnode, container);
      document.body.appendChild(container);
    });
  },

  deleteVNode(vnode) {
    if (vnode && vnode.el) {
      vnode.el.remove();
      const index = this.vnodes.indexOf(vnode);
      if (index !== -1) {
        this.vnodes.splice(index, 1);
      }
    }
  },
};
