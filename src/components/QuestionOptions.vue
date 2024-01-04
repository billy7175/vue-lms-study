<template>
  <div class="question-options">
    <div v-if="isCreateMode">
      <question-option></question-option>
      <question-option></question-option>
      <question-option></question-option>
      <question-option></question-option>
    </div>
    <section v-if="!isCreateMode && data && data.length">
      <div v-for="(x, idx) in data" :key="idx" class="question-option">
        <span class="question-option__prefix">{{ x.label }}</span>
        <el-input
          v-model="x.value"
          :maxlength="100"
          show-word-limit
          disabled
        ></el-input>
      </div>
    </section>
    <section v-if="!isCreateMode && data && data.length === 0">
      <p>입력된 보기가 없습니다.</p>
    </section>

    <!-- SETTING SECTION -->
    <section>
      <h3 style="margin-bottom: 10px; margin-top: 20px">Options</h3>

      <div style="display: flex; align-items: center; gap: 10px">
        <InputSwitch v-model="isPublic" />
        <span>Release Question</span>
        <span style="margin-left: 10px"
          >Question will be visible to registered students.</span
        >
      </div>
      <div style="display: flex; align-items: center; gap: 10px">
        <InputSwitch v-model="isScheduled" />
        <span>Enable Schedule</span>

        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="Pick a day"
          size="large"
        />
      </div>
    </section>
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