<template>
  <div>
    <question-form @create="handleCreate"></question-form>
    <section v-if="questionList && questionList.length">
      <div class="question-wrapper">
        <header class="question-header">
          <p>{{ paramId }}</p>
        </header>
        <div>
          <question
            v-for="(question, idx) in questionList"
            :key="idx"
            :data="question"
            v-model="question.userSelectedAnswer.value"
            :number="idx + 1"
            @delete="handleDelete"
          ></question>
        </div>
      </div>
      <div style="display: flex; justify-content: center; margin: 25px 0px">
        <Button label="Submit" @click="handleSubmit" />
      </div>
    </section>
    <section v-else>
      <h2 style="color: #777; text-align: center">
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
    const route = useRoute();
    const paramId = ref(route.params.id);
    const questionList = ref([]);
    const date = ref(new Date());
    const title = ref("");
    const description = ref("");
    const rate = ref("");
    const status = ref("");

    const fetchQuestion = async () => {
      const { data } = await getQuestions(paramId.value);
      questionList.value = data;
    };

    onMounted(async () => {
      fetchQuestion();
    });

    const handleSubmit = () => {
      console.log("#questionList", questionList.value);
      const isValidated = questionList.value.every((x) => {
        console.log("#x", x.userSelectedAnswer, !!x.userSelectedAnswer.value);
        return !!x.userSelectedAnswer.value;
      });
      if (!isValidated) return alert("Check all the answers.");
      const isConfirm = confirm("Do you want to submit your answers?");
      if (isConfirm) {
        // API 발 사!!!
      }
    };

    const handleCreate = () => {
      fetchQuestion();
    };

    const handleDelete = () => {
      fetchQuestion();
    };

    return {
      date,
      title,
      description,
      rate,
      status,
      questionList,
      handleSubmit,
      handleCreate,
      handleDelete,
      paramId,
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
  margin: 0px auto;
  width: 75%;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.question-header {
  padding: 10px;
  text-align: center;
  background: #666;
  color: #fff;
  font-size: 16px;
}

.question-header p {
  font-size: 26px;
  font-weight: 700;
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