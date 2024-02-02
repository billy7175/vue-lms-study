<template>
  <article class="question" :class="[{ 'is-correct': true }]">
    <div style="display: flex; align-items: flex-start; padding: 40px">
      <span class="question-order">
        Q{{ number }}.
        <i v-if="isTeacher" @click="handleQuestionDelete(data)" class="icon-trash pi pi-trash"></i>
      </span>
      <div class="question-wrapper">
        <p class="question-sentence">
          {{ convertQuestion(data.question, data.answer.value) }}
        </p>
        <div>
          <!-- 문제 풀기 후 -->
          <div v-if="isSubmited">
            <div v-for="(option, idx) in data.options" :key="idx" class="field-radiobutton"
              :class="[{ 'is-matched': modelValue === option.value }, { 'is-question-answer': option.value === data.answer.value }]">
              <RadioButton :id="option.value" :name="option.value" :value="option.value" v-model="modelValue" disabled />
              <label class="field-label" for="city1">{{ option.label }}. {{ option.value }}</label>
            </div>
          </div>

          <!-- 문제 풀기 전 -->
          <div v-else>
            <div v-for="(option) in data.options" :key="option.value" class="field-radiobutton"
              :class="[{ 'is-selected': option.value === selectedAnswer }]">
              <RadioButton v-show="false" :inputId="option.value" :name="option.value" :value="option.value"
                v-model="selectedAnswer" />

              <label class="field-label" :for="option.value" style="display:inline-block; width:90%;">
                {{ option.label }}. {{ option.value }}
              </label>
            </div>
          </div>
          <!-- 문제 풀기 전 -->
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import axios from "axios";
import { ref, watch, computed } from "vue";
import { useUserState } from "../stores/user";
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    modelValue: {
      type: String,
      default: "",
    },
    number: {
      type: Number,
      default: 0,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const isSubmited = computed(() => {
      return props.isSubmitted;
    });
    const userState = useUserState();
    const isTeacher = computed(() => {
      return userState.user?.user?.role === "teacher";
    });
    var pathes = document.querySelectorAll("path");
    pathes.forEach(function (path) {
      var pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength + " " + pathLength;
      path.style.strokeDashoffset = pathLength;
      path.classList.add("uitLogo_path");
    });

    const updateSelectedAnswer = (sampleData, newVal) => {
      // Check if sampleData and userSelectedAnswer are defined before updating
      if (
        sampleData &&
        sampleData.value &&
        sampleData.value.userSelectedAnswer !== undefined
      ) {
        sampleData.value.userSelectedAnswer.value = newVal;
      }
    };

    const sampleData = ref(props.data);
    const modelValue = props.modelValue;
    const testValue = ref("daum");
    const selectedAnswer = ref("");

    watch(selectedAnswer, (newVal, oldVal) => {
      updateSelectedAnswer(sampleData, newVal);
    });

    const convertQuestion = (question, answerValue) => {
      return question.replace(answerValue, "______");
    };

    const handleQuestionDelete = async (data) => {
      const id = data._id;
      const isConfirmed = confirm("Do you really want to delete it?");
      if (isConfirmed) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:3000/api/question/${id}`
          );
          console.log("#handleQuestionDelete", response);
          context.emit("delete");
        } catch (error) {
          console.log("#error", error);
        }
      }
    };

    return {
      convertQuestion,
      number: props.number,
      data: sampleData,
      modelValue: modelValue,
      testValue: testValue,
      selectedAnswer: selectedAnswer,
      handleQuestionDelete,
      isTeacher,
      isSubmited,
    };
  },
};
</script>


<style scoped>
.is-selected {
  border: 1px solid #479dfe;
  color: #1c83f9;
  background: #fff;
}

.is-question-answer {
  border: 1px solid #1d84fb;
  background: #1d84fb !important;
  color: #fff;
}

.question {
  width: 100%;
  margin: auto;
  border-bottom: 1px solid #ccc;
  display: inline-block;
  position: relative;
}

.icon-trash {
  display: none;
  /* width:0px; */
  position: absolute;
  top: 50px;
  left: 5px;
  font-size: 20px;
  transition: 1s;
}

.question:hover .icon-trash {
  display: block;
}

.question.is-correct::before {
  position: absolute;
  content: "";
  width: 150px;
  height: 150px;
  left: -10%;
  top: -25%;
  /* border: 1px solid red; */
  border-radius: 50%;
}

.question-order {
  position: relative;
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
  width: 100%;
  padding-left: 10px;
  margin: 0px;
  margin-top: 5px;
}

.question-sentence {
  line-height: 1.5;
}

.field-radiobutton {
  padding: 0px 10px;
  display: flex;
  align-items: center;
  background: #f9f9f9;
  border-radius: 6px;
  margin-top: 10px;
}

.field-label {
  padding: 15px 0px;
  width: 100%;
  flex-grow: 1;
  /* border: 1px solid red; */
}

label {
  margin-left: 5px;
}

.uitLogo_path {
  animation: uitLineMove 2.5s ease-in forwards;
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite;
}

@keyframes uitLineMove {
  to {
    stroke-dashoffset: 0;
  }
}

.is-matched {
  font-size: 20px;
  padding: 10px;
  background: #57a3fc;
  border-radius: 10px;
  color: #fff;
}
</style>