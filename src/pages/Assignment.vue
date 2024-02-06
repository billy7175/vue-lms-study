<template>
  <div>
    <question-form v-if="isTeacher" @create="handleCreate"></question-form>
    <section v-if="questionList && questionList.length">
      <div class="question-wrapper">
        <header class="question-header">
          <p>{{ paramId }}</p>
        </header>
        <section v-if="isSubmitted" class="answer-table">
          <header class="answer-table__header">
            <div class="cell">문제</div>
            <div class="cell">선택</div>
            <div class="cell">정답</div>
            <div class="cell">채점</div>
          </header>
          <div class="answer-table__body">
            <ul v-if="answerTable && answerTable.length" class="answer-table__ul">
              <li v-for="(answer, idx) in answerTable" :key="idx" class="answer-table__li">
                <div class="cell">{{ answer.number }}</div>
                <div class="cell">{{ answer.userAnswer }}</div>
                <div class="cell">{{ answer.answer }}</div>
                <div class="cell"
                  :class="{ 'correct-answer': answer.userAnswer === answer.answer, 'incorrect-answer': answer.userAnswer !== answer.answer }">
                  {{ getAnswerLabel(answer) }}</div>
              </li>
            </ul>
          </div>
          <footer style="display:flex; justify-content: flex-end;">
            <h2 style="margin-top:50px; margin-right:50px; ">
              맞은 개수 : {{ totalCorrectAnswer }} / {{ answerTable.length }}
            </h2>
          </footer>
        </section>
        <div class="question-wrapper" style="display:flex; flex-direction: column;">
          <question v-for="(question, idx) in questionList" :key="idx" :data="question"
            v-model="question.userSelectedAnswer.value" :number="idx + 1" :isSubmitted="isSubmitted"
            @delete="handleDelete"></question>
        </div>
      </div>
      <div style="display: flex; justify-content: center; margin: 25px 0px">
        <Button v-if="!isSubmitted" label="Submit" @click="handleSubmit" />
        <Button v-else label="Complted Submittion" disabled style="opacity:.5" />

      </div>
    </section>
    <section v-else>
      <h2 style="color: #777; text-align: center">
        {{ paramId }} 에 대한 문제를 생성해주세요
      </h2>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { computed } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { getQuestions } from "../apis/question";
import { getUserAnswers } from '../apis/answer'
import { ref, onMounted, reactive } from "vue";
import QuestionForm from "../components/form/QuestionForm.vue";
import Question from "../components/Question.vue";
import { useUserState } from "../stores/user";
export default {
  components: {
    QuestionForm,
    Question,
  },
  setup() {
    const route = useRoute();
    const router = useRouter()
    const paramId = ref(route.params.id);
    const questionList = ref([]);
    const date = ref(new Date());
    const title = ref("");
    const description = ref("");
    const rate = ref("");
    const status = ref("");
    const userAnswer = reactive({})
    const isSubmitted = ref(false)
    const userState = useUserState()
    const answerTable = ref([])
    const totalCorrectAnswer = ref(0)

    const fetchQuestion = async () => {
      questionList.value = []
      const { data } = await getQuestions(paramId.value);
      questionList.value = data;
    };

    const setTotalCount = () => {
      answerTable.value.forEach(x => {
        if (x.userAnswer === x.answer) totalCorrectAnswer.value += 1
      })
    }

    // const setUserAnswerValue = () => {
    //   questionList.value.map((q, idx) => {
    //     console.log(answerTable.value[idx])
    //     q.userSelectedAnswer.value = answerTable.value[idx].uesrValue
    //   })
    // }

    const fetchUserAnswers = async () => {
      try {
        const { data } = await getUserAnswers(paramId.value)
        console.log('fetchUserAnswers', data)
        userAnswer.value = data
        isSubmitted.value = true

        questionList.value.forEach((q, idx) => {
          answerTable.value.push({
            number: idx + 1,
            userAnswer: data.answers[idx]?.label,
            uesrValue: data.answers[idx]?.value,
            answer: q.answer.label,

          })
        })



        // setUserAnswerValue()
        setTotalCount() // setTotalCount

      } catch (error) {
        console.log(error)
      }
    }

    onMounted(async () => {
      await fetchQuestion();
      if (!isTeacher.value) {
        fetchUserAnswers()
      }
    });

    const handleSubmit = async () => {
      const isValidated = questionList.value.every((x) => {
        return !!x.userSelectedAnswer.value;
      });
      if (!isValidated) return alert("Check all the answers.");
      const isConfirm = confirm("Do you want to submit your answers?");
      if (isConfirm) {
        const answers = []
        questionList.value.forEach(x => {
          answers.push({
            label: x.options.find(option => option.value === x.userSelectedAnswer.value).label,
            value: x.userSelectedAnswer.value,
          })
        })

        const body = {
          date: paramId.value,
          answers: answers,
          user: userState.user.user._id,
        }


        try {
          const { data } = await axios.post("http://127.0.0.1:3000/api/answer", body);
          router.go()
        } catch (error) {
          console.log(error)
        }

      }
    };

    const handleCreate = () => {
      fetchQuestion();
    };

    const handleDelete = () => {
      fetchQuestion();
    };

    const getAnswerLabel = ({ userAnswer, answer }) => {
      return userAnswer === answer ? 'O' : 'X'
    }

    const isTeacher = computed(() => {
      return userState.user.user.role === 'teacher'
    })

    return {
      date,
      title,
      description,
      rate,
      status,
      questionList,
      handleSubmit,
      handleCreate,
      handleDelete,
      paramId,
      isSubmitted,
      answerTable,
      getAnswerLabel,
      isTeacher,
      totalCorrectAnswer
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../src/assets/styles/mixins.scss';

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
  margin: 0px auto;
  width: 850px;
  // background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.question-header {
  padding: 20px;
  text-align: center;
  font-size: 16px;
  @include glassmorphism(1px);
  margin-bottom: 30px;

}

.question-header p {
  font-size: 26px;
  font-weight: 700;
}

.question-wrapper {
  @include glassmorphism(1px);
}

.field-radiobutton {
  margin-top: 5px;
}

label {
  margin-left: 5px;
}

.question {
  display: inline-block;
}

.answer-table {
  width: 70%;
  margin: 50px auto;
  padding: 30px 15px;
  // background: #FAF5F3;
  border-radius: 20px;
  @include glassmorphism(1px);
}

.answer-table__header {
  display: flex;
  font-weight: 700;
}

.answer-table__header div {
  width: 25%;
  text-align: center;
  padding: 15px;
  font-weight: 900;
}

.answer-table__li {
  display: flex;
}

.answer-table__ul {
  padding: 0px;
  margin: 0px;
}

.answer-table__li div {
  width: 25%;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 20px;
  font-weight: 500px;
}

.answer-table .correct-answer {
  color: #57A3FC;
  font-size: 26px;
  font-weight: 600;

}

.answer-table .incorrect-answer {
  color: #FF0F4D;
  font-size: 26px;
  font-weight: 600;
}

.cell {
  /* border:1px solid rgb(63, 59, 59); */
}
</style>