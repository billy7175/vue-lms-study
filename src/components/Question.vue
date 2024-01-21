<template>
  <article class="question" :class="[{ 'is-correct': true }]">
    <i 
      v-if="isTeacher"
      @click="handleQuestionDelete(data)"
      class="icon-trash pi pi-trash"></i>
    <div style="display: none; position: absolute; top: -20%; left: -3%">
      <svg
        class="uitLogo_path"
        xmlns="http://www.w3.org/2000/svg"
        width="250"
        height="150"
        viewBox="0 0 397.25 198"
        id="uitLogo"
      >
        <g>
          <!-- d="M602.1, 332.64c-12.25, 9.75-27.5,14.5-45.25,14.5-17.25,0-32.25-4.75-45-14.5-16.75-12.75-22.19-47.12-22.19-47.12a153.78, 153.78,0,0,1-1.56-19.88V167.89c0-5.5.28-10.84.62-11.87s6.88-1.88,12.38-1.88h2.25c5.5,0,10.67.34,11.5.75s1.5,7,1.5,12.5v98.25a80,80,0,0,0,2.95,19.56s10.8,34.94,37.55,34.94c27.25,0,37.84-34.93,37.84-34.93a81,81,0,0,0,2.91-19.57V167.39c0-5.5.28-10.73.62-11.62s6.88-1.63,12.38-1.63h2.25c5.5,0,10.67.45,11.5,1s1.5,7.25,1.5,12.75v97.75a139,139,0,0,1-1.73,19.85S618.1,319.89,602.1,332.64Z" -->
          <path
            d="M602.1, 332.64c-12.25, 9.75-27.5,14.5-45.25,14.5-17.25,0-32.25-4.75-45-14.5-16.75-12.75-22.19-47.12-22.19-47.12a153.78, 153.78,0,0,1-1.56-19.88V167.89c0-5.5.28-10.84.62-11.87s6.88-1.88,12.38-1.88h2.25c5.5,0,10.67.34,11.5.75s1.5,7,1.5,12.5v98.25a80,80,0,0,0,2.95,19.56s10.8,34.94,37.55,34.94c27.25,0,37.84-34.93,37.84-34.93a81,81,0,0,0,2.91-19.57V167.39c0-5.5.28-10.73.62-11.62s6.88-1.63,12.38-1.63h2.25c5.5,0,10.67.45,11.5,1s1.5,7.25,1.5,12.75v97.75a139,139,0,0,1-1.73,19.85S618.1,319.89,602.1,332.64Z"
            transform="translate(-485.6 -151.64)"
            fill="red"
            stroke="#000"
            stroke-miterlimit="10"
            stroke-width="5"
          />
        </g>
      </svg>
    </div>
    <div style="display: flex; align-items: flex-start; padding: 40px">
      <span class="question-order">Q{{ number }}.</span>
      <div class="question-wrapper">
        <p class="question-sentence">{{ convertQuestion(data.question, data.answer.value) }}</p>
        <div>
          <!-- 문제 풀기 후 -->
          <div v-if="isSubmited">
            {{ modelValue}}
            <div
              v-for="(option, idx) in data.options"
              :key="idx"
              class="field-radiobutton"
              :class="[{'is-matched': modelValue === option.value}]"
              
            >
              <RadioButton
                :id="option.value"
                :name="option.value"
                :value="option.value"
                v-model="modelValue"
                disabled
              />
              <label for="city1">{{ option.label }}. {{ option.value }}</label>
            </div>
          </div>

          <!-- 문제 풀기 전 -->
          <div v-else>
            <div
              v-for="(option, idx) in data.options"
              :key="idx"
              class="field-radiobutton"
            >
              <RadioButton
                :id="option.value"
                :name="option.value"
                :value="option.value"
                v-model="selectedAnswer"
              />
              <label for="city1">{{ option.label }}. {{ option.value }}</label>
            </div>
          </div>
          <!-- 문제 풀기 전 -->
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import axios from 'axios'
import { ref, watch, computed } from "vue";
import { useUserState } from '../stores/user';
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
  },
  setup(props, context) {
    const isSubmited = ref(true)
    const userState = useUserState()
    const isTeacher = computed(() => {
      return userState.user?.user?.role === 'teacher'
    }) 
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
      return question.replace(answerValue, '______')
    }

    const handleQuestionDelete = async (data) => {
      const id = data._id
      const isConfirmed = confirm('Do you really want to delete it?')
      if(isConfirmed) {
        try {
          const response = await axios.delete(`http://127.0.0.1:3000/api/question/${id}`);
          console.log('#handleQuestionDelete', response)
          context.emit('delete')
        } catch (error){
          console.log('#error', error)
        }

      }
    }

    return {
      convertQuestion,
      number: props.number,
      data: sampleData,
      modelValue: modelValue,
      testValue: testValue,
      selectedAnswer: selectedAnswer,
      handleQuestionDelete,
      isTeacher,
      isSubmited
    };
  },
};
</script>


<style scoped>
.question {
  width:100%;
  width:750px;
  border:1px solid red;
  display: inline-block;
  position: relative;
}

.icon-trash {
  display:none;
  position:absolute;
  bottom:20px;
  right:50px;
  font-size:20px;
}

.question:hover .icon-trash{
  display:block;
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
  padding-left: 10px;
  margin: 0px;
  margin-top: 5px;
}

.question-sentence {
  /* letter-spacing: 1.5; */
  border:1px solid red;
  line-height:1.5
}
.field-radiobutton {
  margin-top: 10px;
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
  font-size:20px;
  padding:10px;
  background: #57A3FC;
  border-radius: 10px;
  color:#fff;
}
</style>