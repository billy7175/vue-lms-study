<template>
  <div>
    <div style="margin-bottom:10px;">
      <span>1</span>
      <el-input
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        :value="sampleQuestion.question"
      />
    </div>
    <question-options></question-options>
  </div>
</template>

<script>
import QuestionOptions from './QuestionOptions.vue';
export default {
  components: { QuestionOptions },
  setup() {
    const sampleQuestion = {
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
          value: "light",
        },
        {
          label: "A",
          value: "light",
        },
      ],
      description: "light of 가 정답입니다.",
    };

    return {
      sampleQuestion: sampleQuestion,
    };
  },
};
</script>


<style scoped>
</style>