<template>
  <div style="display: flex; justify-content: center">
    <comment-box @create="handleCreate"></comment-box>
  </div>
</template>

<script>
import CommentBox from "../components/comment/CommentBox.vue";
// import CommentBox from '../components/CommentBox/CommentBox.vue';
export default {
  components: {
    CommentBox,
  },
  setup() {
    const handleCreate = (value) => {
      console.log("#handleCreate", value);
    };

    return {
      handleCreate,
    };
  },
};
</script>