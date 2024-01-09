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
    <div style="display: flex; justify-content: center; gap: 20px;">
      <Button
        label="CANCEL"
        severity="secondary"
        @click="handleModalCancel"
      />
      <Button
        label="CREATE"
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
  setup(props, context) {
    const date = ref(new Date());
    const title = ref("");
    const description = ref("");
    const rate = ref(1);
    const status = ref("");
    const router = useRouter();
    const handleModalCancel = () => {
      context.emit('cancel')
    }

    const handleCreateQuestionBoard = async () => {
      const body = {
        date: date.value,
        title: title.value,
        description: description.value,
        rate: rate.value,
        status: status.value,
      };
      try {
        context.emit("create", body);
      } catch (error){
        alert('실패')
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
      handleModalCancel
    };
  },
};
</script>



<style scoped></style>