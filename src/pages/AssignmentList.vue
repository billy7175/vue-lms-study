<template>
  <div>
    <div style="display: flex; justify-content: flex-end; padding-bottom: 20px">
      <Button label="Create" @click="handleCreate" />
    </div>
    <Dialog
      header="Basic Assignment Infomation"
      :visible="isModalOpen"
      style="width: 900px; padding: 20px; background: #fff"
    >
    
    <div>
      <question-board-form></question-board-form>
    </div>
  </Dialog>
    
    <DataTable
      stripedRows
      selectionMode="single"
      @rowSelect="(row) => routeTo('assignment-update', row.data)"
      :value="[
        {
          date: today,
          title: '파트 5문제 입니다~!',
          description: 'No. 189, Grove St, Los Angeles',
          rating: 3,
          isPublic: 'success',
        },
        {
          date: today,
          title: '파트 5문제 입니다~!',
          description: 'No. 189, Grove St, Los Angeles',
          rating: 3,
          isPublic: 'success',
        },
        {
          date: today,
          title: '파트 5문제 입니다~!(상)',
          description: 'take your time and stay focused.',
          rating: 5,
          isPublic: 'success',
        },
        {
          date: today,
          title: '파트 5문제 입니다~!(상)',
          description: 'take your time and stay focused.',
          rating: 5,
          isPublic: 'success',
        }
      ]"
      tableStyle="min-width: 50rem"
      size="Normal"
    >
      <Column field="date" header="Date"></Column>
      <Column field="title" header="Title"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="rating" header="Reviews">
        <template #body="slotProps">
          <Rating
            :modelValue="slotProps.data.rating"
            readonly
            :cancel="false"
          />
        </template>
      </Column>
      <Column field="isPublic" header="Status">
        <!-- <template #body="slotProps">
            <Tag :value="slotProps.data.isPublic" severity="success"/>
        </template> -->
        <template #body>
          <Tag value="info" severity="info" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
  
  <script lang="ts">
import { onMounted, ref } from "vue";
import dayjs from 'dayjs'
import { getQuestions } from "../apis/question";
import { useRouter } from "vue-router";
import QuestionBoardForm from '../components/form/QuestionBoardForm.vue'

interface Row {
  // id? : any,
  date?: any; // Make the 'date' property optional
}

export default {
  components: { QuestionBoardForm },
  setup() {
    const isModalOpen = ref(true)
    const today = dayjs(new Date()).format("YYYY-MM-DD")
    const router = useRouter();
    const handleCreate = () => {
      alert('#handleCreate')
    }
    const routeTo = (routeName, row: Row = {}) => {
      const date = row?.date;

      router.push({
        params: {
          id: date,
        },
        name: `${routeName}`,
      });
    };

    let questions = ref([]);
    onMounted(async () => {
      const { data } = await getQuestions();
      console.log(data);
      questions.value = ref(data);

    });
    return {
      handleCreate,
      questions: questions,
      routeTo,
      today,
      isModalOpen
    };
  },
};
</script>

<style scoped>
.custom-class {
  border: 1px solid red;
}
</style>