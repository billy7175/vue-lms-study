<template>
  <div>student-id:  "{{ userId }}"</div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    const userId = route.params.id;
    return {
      userId,
    };
  },
};
</script>