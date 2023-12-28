<script setup>
import { ref, watch, computed } from "vue";
import { Check } from "@element-plus/icons-vue";
import Question from "../components/Question.vue";
import QuestionOptions from '../components/QuestionOptions.vue'
import { getQuestions } from "../apis/question";

const first = ref("");
const second = ref("");
const third = ref("");
const forth = ref("");
const today = ref(new Date());

getQuestions();

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
  selectedLetter.value = "";
  console.log("#watch", newVal);
});

const hasAllOptions = computed(() => {
  if (first.value !== "" && second.value && third.value && forth.value)
    return true;
  return false;
});

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
    <div class="left">
      <div>
        <el-date-picker
          v-model="today"
          type="date"
          placeholder="Pick a day"
          size="large"
        >
        </el-date-picker>
      </div>
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
              background: #409eff;
              color: #fff;
              padding: 5px;
              display: inline-block;
              margin: 5px;
              border-radius: 10px;
              font-weight: 600;
            "
          >
            {{ str }}
          </span>
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
        <question-options></question-options>
      </section>
      <section class="button-wrapper">
        <el-button type="primary">문제 생성</el-button>
      </section>
    </div>
    <div class="right">
      <Accordion :activeIndex="0" :multiple="true">
        <AccordionTab header="1번 문제입니다">
          <p class="m-0" style="padding: 20px; border: 1px solid red">
            <Question></Question>
          </p>
        </AccordionTab>
        <AccordionTab header="2번 문제입니다.">
          <p class="m-0" style="padding: 20px; border: 1px solid red">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
            velit, sed quia non numquam eius modi.
          </p>
        </AccordionTab>
        <AccordionTab header="3번 문제입니다.">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus.
          </p>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>


<style>
.assignment .el-input__wrapper {
  background: transparent !important;
  /* border:none !important; */
  box-shadow: none;
  /* border:1px solid blue !important; */
}

.assignment .el-input {
  border: none !important;
}
</style>

<style scoped>
.assignment {
  display: flex;
}
.assignment .left {
  width: 50%;
}

.assignment .right {
  width: 50%;
  padding: 20px;
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
  border-radius: 4px;
  background: #fff;
  min-height: 100px;
  padding: 10px;
  font-weight: 700;
  color: #000;
  white-space: pre;
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
}

.button-wrapper {
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>