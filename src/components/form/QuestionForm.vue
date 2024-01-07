<template>
  <div>
    <h5>문제 생성</h5>
    <div style="display: flex; justify-content: flex-end">
      <Button
        label="Create Question"
        icon="pi pi-external-link"
        @click="handleModalOpen"
        style="margin-bottom: 50px"
      />
    </div>
    <Dialog
      header="CREATE QUESTION"
      :visible="displayBasic"
      style="width: 900px; padding: 20px; background: #fff"
    >
      <div style="height: 30px"></div>
      <h3>Insert Question</h3>
      <Textarea
        style="width: 100%; padding: 10px"
        ref="questionTextRef"
        v-model="questionText"
        rows="5"
        cols="20"
      />
      <div class="preview__question">
        <div
          style="display: inline-block"
          v-for="(str, idx) in arrayStrings"
          :key="idx"
        >
          <!-- @click="clickLetter(str, arrayStrings)" -->
          <span
            v-if="str !== selectedLetter"
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
      <section>
        <h3>Select Answer</h3>
        <question-option
          ref="firstOptionRef"
          v-model="first"
          label="정답"
        ></question-option>
        <!-- <h3>Insert the word you want to make it as "____"</h3> -->
      </section>

      <section class="option-section">
        <h3>Insert Options</h3>
        <question-option
          ref="firstOptionRef"
          v-model="first"
          label="A"
        ></question-option>
        <question-option
          ref="secondOptionRef"
          v-model="second"
          label="B"
        ></question-option>
        <question-option
          ref="thirdOptionRef"
          v-model="third"
          label="C"
        ></question-option>
        <question-option
          ref="forthOptionRef"
          v-model="forth"
          label="D"
        ></question-option>
        <!-- <question-options></question-options> -->
      </section>

      <!-- SETTING SECTION -->
      <section>
        <h3 style="margin-bottom: 10px; margin-top: 20px">Options</h3>

        <div style="display: flex; align-items: center; gap: 10px">
          <InputSwitch v-model="isPublic" />
          <span>Release Question</span>
          <span style="margin-left: 10px"
            >*Question will be visible to registered students.</span
          >
        </div>
        <div style="display: flex; align-items: center; gap: 10px">
          <InputSwitch v-model="isScheduled" />
          <span>Enable Schedule</span>
          <Calendar
            v-model="scheduledDate"
            showIcon
            style="height: 35px; margin-left: 15px"
          />
        </div>
      </section>

      <template #footer>
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          "
        >
          <div>
            <Button
              label="PREVIEW"
              icon="pi pi-check"
              @click="handleModalClose"
              autofocus
            />
          </div>
          <div>
            <Button
              label="CANCEL"
              icon="pi pi-times"
              @click="handleModalClose"
              class="p-button-text"
            />
            <Button
              label="CREATE"
              icon="pi pi-check"
              @click="handleCreate"
              autofocus
            />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { ref, computed } from "vue";
// import QuestionOptions from "@/components/questionOptions.vue";

export default {
  components: {
    // QuestionOptions,
    // PreviewQuestion,
  },
  setup() {
    const isPublic = ref(false);
    const isScheduled = ref(false);
    const scheduledDate = ref(new Date());
    const displayBasic = ref(false);
    const questionText = ref("");

    const questionTextRef = ref(null);
    const firstOptionRef = ref(null);
    const secondOptionRef = ref(null);
    const thirdOptionRef = ref(null);
    const forthOptionRef = ref(null);

    const first = ref("");
    const second = ref("");
    const third = ref("");
    const forth = ref("");
    const selectedLetter = ref("");

    const handleModalOpen = () => {
      displayBasic.value = true;
    };
    const handleModalClose = () => {
      displayBasic.value = false;
    };

    const removeExtraSpaces = (sentence = "") => {
      if (!sentence.value) return "";
      let cleanedSentence = sentence?.value.replace(/[^\S\r\n]+/g, " ");
      const escapedSelectedLetter = selectedLetter.value.replace(
        /[-/\\^$*+?.()|[\]{}]/g,
        "\\$&"
      );

      if (
        questionText.value &&
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

    const arrayStrings = computed(() => {
      const result = removeExtraSpaces(questionText);
      const arrayStrings = result.replace(/[.\r\n]+/g, " ").split(" ");
      return arrayStrings;
    });

    const handleCreate = () => {
      const isValidate = validateInputFields();
      console.log("#isValidated", isValidate);
      const result = {
        type: "multiple choice",
        question: questionText.value,
        answer: "",
        options: [first.value, second.value, third.value, forth.value],
        isPublick: isPublic.value,
        isScheduled: isScheduled.value,
      };
      console.log("#result", result);
    };

    const validateInputFields = () => {
      console.log(111111, questionTextRef.value);
      console.log(222222, firstOptionRef.value);
      if (!questionText.value) {
        alert("입력란을 확인해주세요.");
        return false;
      }

      if (!first.value) {
        alert("AAAAAAAAAAA !!!");
        firstOptionRef.value.focus();
        return false;
      }

      if (!second.value) {
        alert("BBBBBBB");
        secondOptionRef.value.focus();
        return false;
      }

      if (!third.value) {
        alert("CCCC!!");
        thirdOptionRef.value.focus();
        return false;
      }

      if (!forth.value) {
        alert("DDDDDD");
        forthOptionRef.value.focus();
        return false;
      }

      return true;
    };

    return {
      isPublic,
      isScheduled,
      scheduledDate,
      displayBasic,
      questionText,
      questionTextRef,
      first,
      second,
      third,
      forth,
      handleModalOpen,
      handleModalClose,
      handleCreate,
      validateInputFields,
      firstOptionRef,
      secondOptionRef,
      thirdOptionRef,
      forthOptionRef,
      arrayStrings,
    };
  },
};
</script>


<style scoped>
.p-button {
  margin: 0 0.5rem 0 0;
  min-width: 10rem;
}

p {
  margin: 0;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>