<template>
  <div>
    <question-form></question-form>
    <div v-if="questionList && questionList.length">
      <question
        v-for="(question, idx) in questionList"
        :key="idx"
        :data="question"
        v-model="question.userSelectedAnswer.value"
      ></question>
    </div>
    <div style="display:flex; justify-content: center;">
      <Button
        label="Submit"
        icon="pi pi-check"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import QuestionForm from "../components/form/QuestionForm.vue";
import Question from "../components/Question.vue";
export default {
  components: {
    QuestionForm,
    Question,
  },
  setup() {
    const handleSubmit = () => {
        console.log('#handleSubmit', 'asdasdashdjkahjk')
        console.log('#questionList', questionList.value)
    }
    const questionList = ref([
      {
        number: 1,
        question:
          "The prolblem has come to light of extremely delicate potentially criminal nature.",
        answer: {
          positionIndex: 6,
          value: "light",
        },
        options: [
          {
            label: "A",
            value: "light",
          },
          {
            label: "B",
            value: "dark",
          },
          {
            label: "C",
            value: "green",
          },
          {
            label: "D",
            value: "yello",
          },
        ],
        userSelectedAnswer: {
          value: "light",
        },
        description: "light of 가 정답입니다.",
        isSubmited: true 
      },
      {
        number: 2,
        question:
          'The object we are passing into createApp is in fact a component. Every app requires a "root component" that can contain other components as its children.',
        answer: {
          positionIndex: 6,
          value: "light",
        },
        options: [
          {
            label: "A",
            value: "daum",
          },
          {
            label: "B",
            value: "naver",
          },
          {
            label: "C",
            value: "google",
          },
          {
            label: "D",
            value: "hotmail",
          },
        ],
        userSelectedAnswer: {
          value: "daum",
        },
        description: "light of 가 정답입니다.",
        isSubmited: true 
      },
      {
        number: 2,
        question:
          'The object we are passing into createApp is in fact a component. Every app requires a "root component" that can contain other components as its children.',
        answer: {
          positionIndex: 6,
          value: "light",
        },
        options: [
          {
            label: "A",
            value: "jpa",
          },
          {
            label: "B",
            value: "mybatis",
          },
          {
            label: "C",
            value: "react",
          },
          {
            label: "D",
            value: "vue3",
          },
        ],
        userSelectedAnswer: {
          value: "",
        },
        description: "light of 가 정답입니다.",
        isSubmited: false 
      },
    ]);

    return {
      questionList,
      handleSubmit
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
/* padding-left:10px; margin:0px; margin-top:5px; */
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