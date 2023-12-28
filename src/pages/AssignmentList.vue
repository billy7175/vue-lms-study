<template>
  <div>
    <div style="display: flex; justify-content: flex-end; padding-bottom: 20px">
      <Button label="Create" @click="routeTo('assignment-create')" />
    </div>
    <DataTable
      stripedRows
      selectionMode="single"
      @rowSelect="(row) => routeTo('assignment-update', row.data)"
      :value="[
        {
          date: '2023-12-12',
          title: '파트 5문제 입니다~!',
          description: 'No. 189, Grove St, Los Angeles',
          rating: 3,
          isPublic: 'success',
        },
        {
          date: '2023-12-12',
          title: '파트 5문제 입니다~!',
          description: 'No. 189, Grove St, Los Angeles',
          rating: 3,
          isPublic: 'success',
        },
        {
          date: '2023-12-12',
          title: '파트 5문제 입니다~!(상)',
          description: 'take your time and stay focused.',
          rating: 5,
          isPublic: 'success',
        },
        {
          date: '2023-12-12',
          title: '파트 5문제 입니다~!(상)',
          description: 'take your time and stay focused.',
          rating: 5,
          isPublic: 'success',
        },
        {
          date: '2023-12-12',
          title: '파트 5문제 입니다~!(상)',
          description: 'take your time and stay focused.',
          rating: 1,
          isPublic: 'success',
        },
        {
          date: '2023-12-12',
          title: '파트 5문제 입니다~!(상)',
          description: 'take your time and stay focused.',
          rating: 0,
          isPublic: 'success',
        },
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
import { getQuestions } from "../apis/question";
import { useRouter } from "vue-router";

interface Row {
  // id? : any,
  date?: any; // Make the 'date' property optional
}

export default {
  setup() {
    const router = useRouter();
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
      questions: questions,
      routeTo,
    };
  },
};
</script>

<style scoped>
.custom-class {
  border: 1px solid red;
}
</style>