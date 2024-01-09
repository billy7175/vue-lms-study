<template>
  <div>
    <question-form @create="handleCreate" ></question-form>
    <section v-if="(questionList && questionList.length)">
      <div style="display:flex; justify-content: flex-start; gap:50px; flex-direction: row; flex-wrap:wrap; width:75%; margin:auto;">
        <question
          v-for="(question, idx) in questionList"
          :key="idx"
          :data="question"
          v-model="question.userSelectedAnswer.value"
        ></question>
      </div>
      <div style="display: flex; justify-content: center; margin-top:50px;">
        <Button label="Submit" icon="pi pi-check" @click="handleSubmit" />
      </div>
    </section>
    <section v-else>
      <h2 style="color:#777; text-align: center;">
        {{ paramId }} 에 대한 문제를 생성해주세요
      </h2>
    </section>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { getQuestions } from "../apis/question";
import { ref, onMounted } from "vue";
import QuestionForm from "../components/form/QuestionForm.vue";
import Question from "../components/Question.vue";
export default {
  components: {
    QuestionForm,
    Question,
  },
  setup() {
    const route = useRoute()
    const paramId = ref(route.params.id)
    const questionList = ref([]);
    const date = ref(new Date());
    const title = ref("");
    const description = ref("");
    const rate = ref("");
    const status = ref("");

    const fetchQuestion = async () => {
      const { data } = await getQuestions(paramId.value)
      questionList.value = data
    }

    onMounted(async () => {
      fetchQuestion()
    });

    const handleSubmit = () => {
      console.log("#questionList", questionList.value);
    };

    const handleCreate = () => {
      fetchQuestion()
    }

    return {
      date,
      title,
      description,
      rate,
      status,
      questionList,
      handleSubmit,
      handleCreate,
      paramId
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