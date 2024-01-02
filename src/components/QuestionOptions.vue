<template>
  <div class="question-options">
    <section v-if="data && data.length">
      <div v-for="(x, idx) in data" :key="idx" class="question-option">
        <span class="question-option__prefix">{{ x.label }}</span>
        <el-input
          v-model="x.value"
          :maxlength="100"
          show-word-limit
          disabled
        ></el-input>
      </div>
      <!-- <div class="question-option">
        <span class="question-option__prefix">A</span>
        <el-input v-model="first" :maxlength="100" show-word-limit></el-input>
      </div> -->
    </section>
    <section v-else>
      <p>입력된 보기가 없습니다.</p>
    </section>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
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

    return {
      first,
      second,
      third,
      forth,
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
  padding: 10px;
  box-sizing: border-box;
}
</style>

<style>

.question-options .el-input__wrapper {
  border:none !important;
  /* border:1px solid red !important; */
}

.question-options .el-input.is-disabled {
  border:none !important;
  /* border:1px solid blue !important; */
}
</style>