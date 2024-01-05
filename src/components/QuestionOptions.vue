<template>
  <div class="question-options">
    <div v-if="isCreateMode">
      <question-option v-model="first"></question-option>
      <question-option v-model="second"></question-option>
      <question-option v-model="third"></question-option>
      <question-option v-model="forth"></question-option>
    </div>


  </div>
</template>
<script>
import QuestionOption from "./QuestionOption.vue";
import { ref } from "vue";
export default {
  components: {
    QuestionOption,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    isReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    console.log("QuestionOptions 컴포넌트", props.data);
    const first = ref("");
    const second = ref("");
    const third = ref("");
    const forth = ref("");
    const isCreateMode = true;
    const checked2 = true;
    const isPublic = ref(false);
    const isScheduled = ref(false);

    return {
      first,
      second,
      third,
      forth,
      isCreateMode,
      checked2,
      isPublic,
      isScheduled,
    };
  },
};
</script>

<style scoped>
.question-option {
  display: flex;
  border: 1px solid #fff;
  width: 100%;
  /* background:red; */
}

.question-option__prefix {
  padding: 10px;
  box-sizing: border-box;
  /* background:blue; */
}
</style>

<style>
.question-options .el-input__wrapper {
  border: none !important;
  box-shadow: none;
  /* background:blue; */
}

.question-options .el-input.is-disabled {
  border: none !important;
}
</style>