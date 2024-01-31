<template>
  <div>student-id: "{{ userId }}"
    <div v-if="isVisible" style="display:flex; justify-content: center;">
      <user-form :data="user"></user-form>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { fetchUserById } from "../../apis/user";
import { onMounted, reactive, ref } from "vue";
import UserForm from "../../components/form/UserForm.vue";
export default {
  components: {
    UserForm
  },
  setup() {
    const isVisible = ref(false)
    const user = reactive({})
    const route = useRoute();
    const userId = route.params.id;

    const getUser = async () => {
      try {
        const { data } = await fetchUserById(userId)
        user.value = data
        isVisible.value = true
        console.log('detail getUser()', data)
        return data
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(() => {
      getUser()
    })

    return {
      userId,
      user,
      isVisible
    };
  },
};
</script>