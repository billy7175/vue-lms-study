<template>
  <div>
    <div v-if="isVisible" style="display:flex; gap:50px;">
      <user-form style="width:40%;" :data="user" title="User Profile"></user-form>
      <div style="width:60%;">
        <TabView>
          <TabPanel header="납부현황">
            <PayTable></PayTable>
            <p class="">
              2024년 2월 납부 현황은
              <Tag value="Primary">완료</Tag> 상태입니다
              <Tag severity="info" value="Primary">카드</Tag>
            </p>
            <p>
              2023년 12월 납부현황은
              <Tag value="Primary">완료</Tag> 상태입니다
              <Tag severity="info" value="Primary">현금</Tag>
            </p>
            <p>2023년 11월 납부현황은
              <Tag severity="danger" value="Warning">미납</Tag>

              상태입니다
            </p>
          </TabPanel>
          <TabPanel header="Following">
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </p>
          </TabPanel>
          <TabPanel header="Followers">
            <p class="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
              aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              Nemo enim
              ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
              qui
              ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
        </TabView>

        <TabView style="margin-top:20px;">
          <TabPanel header="Following">
            <!-- <ul> -->
            <p>
              1. Feature
            </p>
            <p>
              2. Feature
            </p>
            <p>
              3. Feature
            </p>
            <p>
              4. Feature
            </p>
            <p>
              5. Feature
            </p>
            <!-- </ul> -->
          </TabPanel>


        </TabView>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { fetchUserById } from "../../apis/user";
import { onMounted, reactive, ref } from "vue";
import UserForm from "../../components/form/UserForm.vue";
import PayTable from "../../components/table/PayTable.vue";
export default {
  components: {
    UserForm,
    PayTable
  },
  setup() {
    const isVisible = ref(false)
    const user = reactive({})
    const route = useRoute();
    const router = useRouter()
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
        return router.push({ name: 'student-list' })
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

<style scoped>
.p-tag-info {
  background: red;
  background: #8a8cf0d2;
}
</style>