import { createVNode, render } from "vue";

export default {
  vnode: null,

  test() {
    alert("test");
    console.log("#message box js.");
  },

  create() {
    console.log("message box h");
    const newVnode = createVNode(
      "div",
      {
        class: "global-alert",
      },
      "wow i think this is working"
    );

    // Update the top-level vnode with the new vnode
    this.vnode = newVnode;

    // Render the new vnode
    render(newVnode, document.body);

    // Now, you can perform additional actions after the new vnode has been rendered
    console.log("Component has been created.");

    setTimeout(() => {
      this.deleteVNode();
    }, 3000);
  },

  // Example of a function that can be called externally to delete the vnode
  deleteVNode() {
    console.log("#deleteVNode");
    console.log(this.vnode);
    if (this.vnode && this.vnode.el) {
      // Remove the vnode from the DOM
      this.vnode.el.remove();

      // Reset the vnode variable
      this.vnode = null;
    }
  },
};
