<template>
  <div>
    <question-form></question-form>
    <article class="question">
      <div style="display: flex; align-items: flex-start;">
        <span class="question-order">Q1.</span>
        <div class="question-wrapper">
          <p>Which of the following is not a rule of language.</p>
          <div>
            <div class="field-radiobutton">
              <RadioButton
                id="city1"
                name="city"
                value="Chicago"
                v-model="city"
              />
              <label for="city1">Chicago</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="city2"
                name="city"
                value="Los Angeles"
                v-model="city"
              />
              <label for="city2">Los Angeles</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="city3"
                name="city"
                value="New York"
                v-model="city"
              />
              <label for="city3">New York</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="city4"
                name="city"
                value="San Francisco"
                v-model="city"
              />
              <label for="city4">San Francisco</label>
            </div>
          </div>
        </div>
      </div>
    </article>
    <article class="question">
      <div style="display: flex; align-items: flex-start;">
        <span class="question-order">Q1.</span>
        <div class="question-wrapper">
          <p>Which of the following is not a rule of language.</p>
          <div>
            <div class="field-radiobutton">
              <RadioButton
                id="city1"
                name="city"
                value="Chicago"
                v-model="city"
              />
              <label for="city1">Chicago</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="city2"
                name="city"
                value="Los Angeles"
                v-model="city"
              />
              <label for="city2">Los Angeles</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="city3"
                name="city"
                value="New York"
                v-model="city"
              />
              <label for="city3">New York</label>
            </div>
            <div class="field-radiobutton">
              <RadioButton
                id="city4"
                name="city"
                value="San Francisco"
                v-model="city"
              />
              <label for="city4">San Francisco</label>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import QuestionForm from '../components/form/QuestionForm.vue'
export default {
  components: {
    QuestionForm  
  },
  data() {
    return {
      city: null,
    };
  }
};
</script>

<style scoped>
* {
  /* border:1px solid red; */
}
.question-order {
  padding:4px 6px;
  box-sizing: border-box;
  background: #C4EED0;
  color:#000;
  border-radius: 6px;
}
/* padding-left:10px; margin:0px; margin-top:5px; */
p {
  margin:0px;
}

.question-wrapper {
  border:1px solid red;
  padding-left:10px;
  margin:0px;
  margin-top:5px;
}
.field-radiobutton {
  margin-top:5px;
}

label {
  margin-left:5px;
}

.question {
  display:inline-block;
}

</style>