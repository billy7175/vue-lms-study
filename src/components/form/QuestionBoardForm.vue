<template>
  <section>
    <h2>해당 날짜에 대한 데이터를 입력 후 문제 생성이 가능합니다.</h2>
    <pre>
        - Date To Be Released
        - Title
        - Description
        - Rate Of Today's Questions
        - Status Whether It Is Released Or Not
        - Classes
      </pre
    >
    <div style="padding: 100px; padding-bottom: 50px">
      <Calendar v-model="date" showIcon style="width: 100%" />
      <question-option
        ref="titleRef"
        v-model="title"
        label="Title"
      ></question-option>
      <question-option
        ref="descriptionRef"
        v-model="description"
        label="Description"
      ></question-option>
      <question-option
        ref="rateRef"
        v-model="rate"
        label="Rate"
      ></question-option>
      <question-option
        ref="statusRef"
        v-model="status"
        label="Status"
      ></question-option>
    </div>
    <div style="display: flex; justify-content: center">
      <Button
        label="CREATE"
        icon="pi pi-check"
        @click="handleCreateQuestionBoard"
      />
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import { ref } from 'vue'
import { useRouter } from "vue-router";
export default {
  setup() {
    const date = ref(new Date());
    const title = ref("");
    const description = ref("");
    const rate = ref(1);
    const status = ref("");
    const router = useRouter();
    const handleCreateQuestionBoard = async () => {
      const body = {
        date: date.value,
        title: title.value,
        description: description.value,
        rate: rate.value,
        status: status.value,
      };
      // console.log("#body", body);
      // const formattedDate = dayjs(body.date).format("YYYY-MM-DD");
      // const routeName = "assignment-update";
      // router.push({
      //   params: {
      //     id: formattedDate,
      //   },
      //   name: `${routeName}`,
      // });
      try {
        const response = await axios.post("http://127.0.0.1:3000/api/question-board", body);
        window.reload()
      } catch (error){

      }
      


      


      // 1. Question-Board 생성 
      // 2. Close Modal
      // 3. Re-Fetch Question-Board-List
    };

    return {
      date,
      title,
      description,
      rate,
      status,
      handleCreateQuestionBoard,
    };
  },
};
</script>



<style scoped></style>