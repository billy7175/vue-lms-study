<script setup>
import { ref, watch, computed } from "vue";
import { Check } from "@element-plus/icons-vue";

const first = ref("");

const second = ref("");

const third = ref("");

const forth = ref("");

const question = ref(
  "The problem has come the light of extremely delicate potentially criminal nature."
);
const selectedLetter = ref("");

const removeExtraSpaces = (sentence = "") => {
  let cleanedSentence = sentence.value.replace(/[^\S\r\n]+/g, " ");
  const escapedSelectedLetter = selectedLetter.value.replace(
    /[-/\\^$*+?.()|[\]{}]/g,
    "\\$&"
  );

  if (
    question.value &&
    selectedLetter.value !== "" &&
    cleanedSentence.includes(selectedLetter.value)
  ) {
    cleanedSentence = cleanedSentence.replace(
      new RegExp(`\\b${escapedSelectedLetter}\\b`, "gi"),
      "___"
    );
  }
  return cleanedSentence;
};

watch(question, (newVal, oldVal) => {
  selectedLetter.value = '';
  console.log("#watch", newVal);
});

const hasAllOptions = computed(() => {
  if(first.value !== '' && second.value && third.value && forth.value) return true
  return false
})


const previewQuestion = computed(() => {
  const result = removeExtraSpaces(question);
  return result;
});

const arrayStrings = computed(() => {
  const result = removeExtraSpaces(question);
  const arrayStrings = result.replace(/[.\r\n]+/g, " ").split(" ");
  return arrayStrings;
});

const clickLetter = (str) => {
  selectedLetter.value = str;
};
</script>

<template>
  <div class="assignment">
    <h2 class="title">
      <el-button
        :color="question === '' ? 'lightgrey' : ''"
        size="small"
        type="success"
        :icon="Check"
        circle
      />
      문제를 입력해주세요.
    </h2>
    <el-input
      class="assignment__question"
      v-model="question"
      :maxlength="300"
      placeholder="Please input"
      show-word-limit
      type="textarea"
    />

    <h3 class="title">
      <el-button
        :color="selectedLetter === '' ? 'lightgrey' : ''"
        size="small"
        type="success"
        :icon="Check"
        circle
      />
      빈칸으로 변경할 단어를 선택해주세요.
    </h3>

    <div class="preview__question">
      <div
        style="display: inline-block"
        v-for="(str, idx) in arrayStrings"
        :key="idx"
      >
        <span
          v-if="str !== selectedLetter"
          @click="clickLetter(str, arrayStrings)"
          style="
            margin-right: 5px;
            background: red;
            color: #fff;
            padding: 5px;
            border-radius: 10px;
            font-weight: 600;
          "
        >
          {{ str }}
        </span>
        <!-- <span v-else @click="selectedLetter = ''"> ___ </span> -->
      </div>
    </div>

    <section class="preview">
      <h3 class="title">
        <el-button
          :color="!hasAllOptions ? 'lightgrey' : ''"
          size="small"
          type="success"
          :icon="Check"
          circle
        />
         선택지에 대한 빈칸을 입력해주세요.
      </h3>

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
    </section>
    <div class="preview__question">
      <pre style="">
          {{ previewQuestion }}
        </pre
      >
    </div>
    <ul>
      <li>
        <p>
          1.
          <el-button
            :color="question === '' ? 'lightgrey' : ''"
            size="small"
            type="success"
            :icon="Check"
            circle
          />
          <span> 문제를 입력해주세요. </span>
        </p>
      </li>
      <li>
        <p>
          2.
          <el-button
            :color="selectedLetter === '' ? 'lightgrey' : ''"
            size="small"
            type="success"
            :icon="Check"
            circle
          />
          <span> 빈칸으로 변경할 단어를 선택해주세요. </span>
        </p>
      </li>
      <li>
        <p>
          3.
          <el-button
            :color="hasAllOptions ? '' : 'lightgrey'"
            size="small"
            type="success"
            :icon="Check"
            circle
          />
          <span> 선택지에 대한 빈칸을 입력해주세요. </span>
        </p>
      </li>
    </ul>
    <section class="button-wrapper">
      <el-button type="primary">문제 생성</el-button>
    </section>
  </div>
</template>


<style>

.assignment .el-input__wrapper {
  background:transparent !important;
  /* border:none !important; */
  box-shadow:  none ;
  /* border:1px solid blue !important; */
}

.assignment .el-input {
  border:none !important;
}

</style>

<style scoped>
.question-option {
  display: flex;
  background: rgb(252, 251, 251);
}
.question-option__prefix {
  /* padding:10px; */
  padding:10px;
  padding-right:10px;
  box-sizing: border-box;
}

.assignment {
  height: 100%;
}

.title {
  margin: 10px 0px;
  display: flex;
  gap: 5px;
  align-items: center;
}
.assignment__question {
  width: 100%;
  border-radius: 10px;
}
.preview {
  height: 370px;
  overflow-y: auto;
}

.preview__question {
  opacity: 0.7;
  border: 1px solid rgb(184, 183, 183);
  background: #fff;
  min-height: 100px;
  padding: 10px;
  font-weight: 700;
  color: #000;
  white-space: pre;
}

.button-wrapper {
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>