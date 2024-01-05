<template>
  <article class="question" :class="[{ 'is-correct': true }]">
    <div>
      <svg
        class="test_svg"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="black"
          stroke-width="2"
        />
      </svg>
      <svg
        class="uitLogo_path"
        xmlns="http://www.w3.org/2000/svg"
        width="250"
        height="150"
        viewBox="0 0 397.25 198"
        id="uitLogo"
      >
        <g>
          <path
            d="M602.1,332.64c-12.25,9.75-27.5,14.5-45.25,14.5-17.25,0-32.25-4.75-45-14.5-16.75-12.75-22.19-47.12-22.19-47.12a153.78,153.78,0,0,1-1.56-19.88V167.89c0-5.5.28-10.84.62-11.87s6.88-1.88,12.38-1.88h2.25c5.5,0,10.67.34,11.5.75s1.5,7,1.5,12.5v98.25a80,80,0,0,0,2.95,19.56s10.8,34.94,37.55,34.94c27.25,0,37.84-34.93,37.84-34.93a81,81,0,0,0,2.91-19.57V167.39c0-5.5.28-10.73.62-11.62s6.88-1.63,12.38-1.63h2.25c5.5,0,10.67.45,11.5,1s1.5,7.25,1.5,12.75v97.75a139,139,0,0,1-1.73,19.85S618.1,319.89,602.1,332.64Z"
            transform="translate(-485.6 -151.64)"
            fill="none"
            stroke="#000"
            stroke-miterlimit="10"
            stroke-width="5"
          />
        </g>
      </svg>
      <!-- <path
        d="M711.22,342.39c-.89.28-6.12.5-11.62.5h-2.75c-5.5,0-10.74-.22-11.63-.5s-1.62-7.25-1.62-12.75v-162c0-5.5.22-10.73.5-11.62s7.25-1.63,12.75-1.63h2.75a88,88,0,0,1,11.62.5c.89.28,1.63,7.25,1.63,12.75v162C712.85,335.14,712.11,342.12,711.22,342.39Z"
        transform="translate(-485.6 -151.64)"
        fill="none"
        stroke="#000"
        stroke-miterlimit="10"
        stroke-width="5"
      /> -->
      <!-- <path
        d="M838.59,180.64a10,10,0,0,0-10,10V329.89c0,5.5-.22,10.68-.5,11.5s-7,1.5-12.5,1.5h-2.25c-5.5,0-10.67-.22-11.5-.5s-1.5-7-1.5-12.5V190.64a10,10,0,0,0-10-10h-28.5c-5.5,0-10.67-.28-11.5-.62s-1.5-7.13-1.5-12.63h0c0-5.5.28-10.67.63-11.5s6.87-1.5,12.37-1.5h105.5c5.5,0,10.68.28,11.5.63s1.5,6.87,1.5,12.37h0c0,5.5-.22,10.73-.5,11.63s-7,1.62-12.5,1.62Z"
        transform="translate(-485.6 -151.64)"
        fill="none"
        stroke="#000"
        stroke-miterlimit="10"
        stroke-width="5"
      /> -->
    </div>
    <div style="display: flex; align-items: flex-start; padding: 10px">
      <span class="question-order">Q{{ data.number }}.</span>
      <div class="question-wrapper">
        <p>{{ data.question }}</p>
        <div>
          <div v-if="data.isSubmited">
            <div
              v-for="(option, idx) in data.options"
              :key="idx"
              class="field-radiobutton"
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

          <!-- 문제 풀기 후 -->
          <div v-else style="border: 1px solid blue">
            <div
              v-for="(option, idx) in data.options"
              :key="idx"
              class="field-radiobutton"
            >
              <RadioButton
                :id="option.value"
                :name="option.value"
                :value="'light'"
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
import { ref } from "vue";
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          number: 1,
        };
      },
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    var pathes = document.querySelectorAll("path");
    pathes.forEach(function (path) {
      var pathLength = path.getTotalLength();
      path.style.strokeDasharray = pathLength + " " + pathLength;
      path.style.strokeDashoffset = pathLength;
      path.classList.add("uitLogo_path");
      path.classList.add("test_svg");
    });

    // var pathes = document.querySelectorAll("path");
    // pathes.forEach(function (path) {
    //   var pathLength = path.getTotalLength();
    //   path.style.strokeDasharray = pathLength + " " + pathLength;
    //   path.style.strokeDashoffset = pathLength;
    //   path.classList.add("test_svg");
    // });

    const sampleData = props.data;
    const modelValue = props.modelValue;
    console.log("Question Model Value", props.modelValue);
    const testValue = ref("daum");
    return {
      data: sampleData,
      modelValue: modelValue,
      testValue: testValue,
    };
  },
};
</script>


<style scoped>
.question {
  display: inline-block;
  margin: 20px;
  max-width: 550px;
  position: relative;
}
.question.is-correct::before {
  position: absolute;
  content: "";
  width: 150px;
  height: 150px;
  left: -10%;
  top: -25%;
  border: 1px solid red;
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
.field-radiobutton {
  margin-top: 5px;
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
</style>