<template>
  <div class="question-options">
    <div class="question-option">
      <span class="question-option__prefix">A</span>
      <el-input v-model="first" :maxlength="100" show-word-limit></el-input>
    </div>

    <div class="question-option">
      <span class="question-option__prefix">B</span>
      <el-input v-model="second" :maxlength="100" show-word-limit></el-input>
    </div>

    <div class="question-option">
      <span class="question-option__prefix">C</span>
      <el-input v-model="third" :maxlength="100" show-word-limit></el-input>
    </div>

    <div class="question-option">
      <span class="question-option__prefix">D</span>
      <el-input v-model="forth" :maxlength="100" show-word-limit></el-input>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const first = ref("");
    const second = ref("");
    const third = ref("");
    const forth = ref("");

    return {
      first,
      second,
      third,
      forth
    };
  },
};
</script>

<style scoped>
.question-option {
  display: flex;
  background: rgb(252, 251, 251);
  background: #f4f4f4;
}
.question-option__prefix {
  /* padding:10px; */
  padding: 10px;
  padding-right: 10px;
  box-sizing: border-box;
}
</style>