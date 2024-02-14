<template>
  <div class="assignment-list">
    <div style="display: flex; justify-content: flex-end; padding-bottom: 20px">
      <Button label="Create" @click="handleModalOpen" />
    </div>
    <Dialog header="Basic Assignment Infomation" :visible="isModalOpen"
      style="width: 900px; padding: 20px; background: #fff">
      <question-board-form @create="handleCreateBoard" @cancel="handleModalCancel"></question-board-form>
    </Dialog>

    <DataTable selectionMode="single" @rowSelect="(row) => routeTo('assignment-update', row.data)" :value="questions"
      tableStyle="min-width: 50rem" size="Normal">
      <Column field="date" header="Date"></Column>
      <Column field="title" header="Title"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="rate" header="Rate">
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rate" readonly :cancel="false" />
        </template>
      </Column>
      <Column v-if="isTeacher" field="" header="Released">
        <template #body="slotProps">
          <InputSwitch v-model="slotProps.data.isReleased" />
        </template>
      </Column>
      <Column v-if="isTeacher" field="" header="비고">
        <template #body>
          <Button label="DELETE" severity="danger" rounded size="small" @click="handleDelete" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
  
<script>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import dayjs from "dayjs";
import { getQuestionBoards } from "../apis/question";
import { useRouter } from "vue-router";
import QuestionBoardForm from "../components/form/QuestionBoardForm.vue";
import { useUserState } from "../stores/user";

export default {
  components: { QuestionBoardForm },
  setup() {
    const userState = useUserState()

    const isModalOpen = ref(false);
    const today = dayjs(new Date()).format("YYYY-MM-DD");
    const router = useRouter();
    const handleModalOpen = () => {
      isModalOpen.value = true;
    };

    const handleModalCancel = () => {
      isModalOpen.value = false;
    };

    const handleCreateBoard = async (body) => {
      isModalOpen.value = false;
      try {
        const response = await axios.post(
          "http://127.0.0.1:3000/api/question-board",
          body
        );

        console.log("#response", response);
        isModalOpen.value = false;
        fetchQuestionBoards();
      } catch (error) {
        alert("실패 !");
      }
    };

    const fetchQuestionBoards = async () => {
      const { data } = await getQuestionBoards();
      questions.value = data.map((x) => {
        return {
          ...x,
          date: dayjs(x.date).format("YYYY.MM.DD"),
        };
      });
    };
    const routeTo = (routeName, row = {}) => {
      const date = dayjs(row?.date).format("YYYY-MM-DD");

      router.push({
        params: {
          id: date,
        },
        name: `${routeName}`,
      });
    };

    const handleDelete = () => {
      const isConfirmed = confirm('handleDelete')
      alert(isConfirmed)
    }

    let questions = ref([]);
    onMounted(async () => {
      fetchQuestionBoards();
    });

    const isTeacher = computed(() => {
      return userState.user?.user?.role === 'teacher'
    })

    return {
      handleModalOpen,
      handleModalCancel,
      handleDelete,
      questions: questions,
      routeTo,
      today,
      isModalOpen,
      handleCreateBoard,
      isTeacher
    };
  },
};
</script>
<style lang="scss">
@import '../../src/assets/styles/mixins.scss';

.assignment-list .p-datatable-wrapper {
  border-radius: 10px;
}

.assignment-list .p-datatable-wrapper tr,
td,
th {
  text-indent: 10px;
  padding: 10px;
  font-weight: 600;
}

.assignment-list .p-datatable-wrapper th,
td {}

.assignment-list .p-datatable-wrapper .p-rating-item path {
  /* color: #FFF27A; */
}

.p-paginator {
  // @include glassmorphism(2px);
  margin-top: 10px;
}

.p-datatable .p-datatable-header {
  // @include glassmorphism(2px);
  margin-bottom: 20px;
}

.p-datatable .p-datatable-thead {
  // @include glassmorphism(2px);
}

.p-datatable .p-datatable-thead>tr>th {
  background: none;
  border: none;
}

.p-datatable .p-datatable-thead>tr>th>td {
  background: none;
}

.p-datatable .p-datatable-tbody {
  // @include glassmorphism(10px);
}

.p-datatable .p-datatable-tbody>tr {
  background: none;
}

.p-datatable .p-datatable-tbody>tr>td {
  background: transparent;
  border: none;
  box-shadow: 0 2px 0px 0 rgba(31, 38, 135, 0.37);
  color: #201e1e;
  font-weight: 700;
}
</style>