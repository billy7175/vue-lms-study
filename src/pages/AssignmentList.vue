<template>
  <div class="assignment-list">
    <div style="display: flex; justify-content: flex-end; padding-bottom: 20px">
      <Button label="Create" @click="handleModalOpen" />
    </div>
    <Dialog
      header="Basic Assignment Infomation"
      :visible="isModalOpen"
      style="width: 900px; padding: 20px; background: #fff"
    >
      <question-board-form
        @create="handleCreateBoard"
        @cancel="handleModalCancel"

        
      ></question-board-form>
    </Dialog>

    <DataTable
      selectionMode="single"
      @rowSelect="(row) => routeTo('assignment-update', row.data)"
      :value="questions"
      tableStyle="min-width: 50rem"
      size="Normal"
    >
      <Column field="date" header="Date"></Column>
      <Column field="title" header="Title"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="rate" header="Rate">
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rate" readonly :cancel="false" />
        </template>
      </Column>
      <Column field="" header="Released">
        <template #body="slotProps">
          <InputSwitch v-model="slotProps.data.isReleased"/>
        </template>
      </Column>
      <Column field="" header="비고">
        <template #body>
          <Button label="DELETE" severity="danger" rounded size="small" @click="handleDelete" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
  
  <script lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import { getQuestionBoards } from "../apis/question";
import { useRouter } from "vue-router";
import QuestionBoardForm from "../components/form/QuestionBoardForm.vue";

interface Row {
  // id? : any,
  date?: any; // Make the 'date' property optional
}

export default {
  components: { QuestionBoardForm },
  setup() {
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
    const routeTo = (routeName, row: Row = {}) => {
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
    return {
      handleModalOpen,
      handleModalCancel,
      handleDelete,
      questions: questions,
      routeTo,
      today,
      isModalOpen,
      handleCreateBoard,
    };
  },
};
</script>

<style scoped>
.custom-class {
  border: 1px solid red;
}
</style>

<style>
.p-datatable-wrapper {
  border-radius: 10px;
  /* border:2px solid rgb(56, 54, 54); */
}
.p-datatable-wrapper tr, td, th {
  /* background:#222223; */
  /* border:1px solid #222223; */
  /* color:var(--font--color); */
  font-weight: 700;
  text-indent: 10px;
  padding:20px;
}

.p-datatable-wrapper th, td {
  /* border-bottom:2px solid rgb(56, 54, 54); */
}

.p-datatable-wrapper .p-rating-item path {
  /* color: #FFF27A; */
}



</style>