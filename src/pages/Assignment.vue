<template>
  <div>
    <question-form></question-form>
    <section v-if="(questionList && questionList.length)">
      <div>
        <question
          v-for="(question, idx) in questionList"
          :key="idx"
          :data="question"
          v-model="question.userSelectedAnswer.value"
        ></question>
      </div>
      <div style="display: flex; justify-content: center">
        <Button label="Submit" icon="pi pi-check" @click="handleSubmit" />
      </div>
    </section>
    <section v-else>
      <h2 style="color:#777; text-align: center;">
        문제를 생성해주세요
      </h2>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import QuestionForm from "../components/form/QuestionForm.vue";
import Question from "../components/Question.vue";
export default {
  components: {
    QuestionForm,
    Question,
  },
  setup() {
    const date = ref(new Date());
    const title = ref("");
    const description = ref("");
    const rate = ref("");
    const status = ref("");

    onMounted(async () => {});

    const handleSubmit = () => {
      console.log("#questionList", questionList.value);
    };

    const questionList = ref([]);

    return {
      date,
      title,
      description,
      rate,
      status,
      questionList,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
* {
}
.question-order {
  padding: 4px 6px;
  box-sizing: border-box;
  background: #c4eed0;
  color: #000;
  border-radius: 6px;
}

p {
  margin: 0px;
}

.question-wrapper {
  border: 1px solid red;
  padding-left: 10px;
  margin: 0px;
  margin-top: 5px;
}
.field-radiobutton {
  margin-top: 5px;
}

label {
  margin-left: 5px;
}

.question {
  display: inline-block;
}
</style>