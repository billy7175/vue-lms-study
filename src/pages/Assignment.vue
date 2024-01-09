<template>
  <div>
    <question-form></question-form>
    <section v-if="(questionList && questionList.length)">
      <div>
        <question
          v-for="(question, idx) in questionList"
          :key="idx"
          :data="question"
          v-model="question.userSelectedAnswer.value"
        ></question>
      </div>
      <div style="display: flex; justify-content: center">
        <Button label="Submit" icon="pi pi-check" @click="handleSubmit" />
      </div>
    </section>
    <section v-else>
      <h2 style="color:#777; text-align: center;">
        문제를 생성해주세요
      </h2>
    </section>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import QuestionForm from "../components/form/QuestionForm.vue";
import Question from "../components/Question.vue";
export default {
  components: {
    QuestionForm,
    Question,
  },
  setup() {
    const mode = ref("");
    const date = ref(new Date());
    const title = ref("");
    const description = ref("");
    const rate = ref("");
    const status = ref("");
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      console.log("#onMounted", 55555);
      console.log("#router", router);
      console.log("#route", route);
      console.log("#route", route.name);
      console.log("#route", route.path);
      console.log("#route", route.path.split("/").at(-1));
      console.log("#params", route.params);
      const lastPath = route.path.split("/").at(-1);
      console.log("#lastPath", lastPath);
      if (lastPath === "create") {
        // 이 경우는 생성 모드
        mode.value = "CREATE";
      } else {
        const date = route.params.id;
        console.log("#date", date);
        const response = await axios.get(
          `http://127.0.0.1:3000/api/question-board/${date}`
        );
        console.log("#response", response);
      }
    });

    const handleSubmit = () => {
      console.log("#handleSubmit", "asdasdashdjkahjk");
      console.log("#questionList", questionList.value);
    };

    const handleCreateQuestionBoard = async () => {
      const body = {
        date: date.value,
        title: title.value,
        description: description.value,
        rate: rate.value,
        status: status.value,
      };
      console.log("#body", body);
      const formattedDate = dayjs(body.date).format("YYYY-MM-DD");
      const routeName = "assignment-update";
      router.push({
        params: {
          id: formattedDate,
        },
        name: `${routeName}`,
      });

      console.log("#formattedDate", formattedDate);
    };
    const questionList = ref([
      {
        number: 1,
        question:
          "The prolblem has come to light of extremely delicate potentially criminal nature.",
        answer: {
          positionIndex: 6,
          value: "light",
        },
        options: [
          {
            label: "A",
            value: "light",
          },
          {
            label: "B",
            value: "dark",
          },
          {
            label: "C",
            value: "green",
          },
          {
            label: "D",
            value: "yello",
          },
        ],
        userSelectedAnswer: {
          value: "light",
        },
        description: "light of 가 정답입니다.",
        isSubmited: false,
      },
      {
        number: 2,
        question:
          'The object we are passing into createApp is in fact a component. Every app requires a "root component" that can contain other components as its children.',
        answer: {
          positionIndex: 6,
          value: "light",
        },
        options: [
          {
            label: "A",
            value: "daum",
          },
          {
            label: "B",
            value: "naver",
          },
          {
            label: "C",
            value: "google",
          },
          {
            label: "D",
            value: "hotmail",
          },
        ],
        userSelectedAnswer: {
          value: "daum",
        },
        description: "light of 가 정답입니다.",
        isSubmited: false,
      },
      {
        number: 2,
        question:
          'The object we are passing into createApp is in fact a component. Every app requires a "root component" that can contain other components as its children.',
        answer: {
          positionIndex: 6,
          value: "light",
        },
        options: [
          {
            label: "A",
            value: "jpa",
          },
          {
            label: "B",
            value: "mybatis",
          },
          {
            label: "C",
            value: "react",
          },
          {
            label: "D",
            value: "vue3",
          },
        ],
        userSelectedAnswer: {
          value: "",
        },
        description: "light of 가 정답입니다.",
        isSubmited: false,
      },
    ]);

    return {
      date,
      title,
      description,
      rate,
      status,
      questionList,
      handleSubmit,
      handleCreateQuestionBoard,
    };
  },
};
</script>

<style scoped>
* {
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
  border: 1px solid red;
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

.question {
  display: inline-block;
}
</style>