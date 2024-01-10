<template>
  <div class="vocabulary-sheet">
    <header class="header">
      <div class="header__inner">
        <div class="sub-title">Unit 02 BUSY BEES</div>
        <div class="sub-info">Date __________ / __________  <span style="margin-left:10px; display:inline-block;">Name : __________ </span></div>
        <h2>바로 읽는 배경지식 독해 LEVEL 1</h2>
        <strong> Vocaburary List </strong>
      </div>
    </header>
    <header
      style="
        display: flex;
        justify-content: center;
        gap: 20px;
        padding: 30px;
        margin-top: 50px;
      "
    >
      <Button
        @click="handleCheckData"
        label="Check Data"
        icon="pi pi-external-link"
      />

      <Button
        @click="handleCheckData"
        label="PDF Download"
        icon="pi pi-external-link"
        severity="secondary"
      />
    </header>
    <div class="vocabulary-sheet__body">
      <section class="section -left">
        <div v-for="(x, idx) in inputValuesSection1" class="item" :key="x">
          <span class="number">0{{ idx + 1 }}</span>
          <InputText type="text" v-model="inputValuesSection1[idx].eng" />
          <InputText type="text" v-model="inputValuesSection1[idx].kor" />
        </div>
      </section>
      <section class="section -right">
        <div v-for="(x, idx) in inputValuesSection2" class="item" :key="x">
          <span class="number">0{{ idx + 1 + 15 }}</span>
          <InputText type="text" v-model="inputValuesSection2[idx].eng" />
          <InputText type="text" v-model="inputValuesSection2[idx].kor" />
        </div>
      </section>
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const createEmptyItem = () => ({ kor: "", eng: "" });
    // const inputValuesSection1 = ref(new Array(30).fill({ kor: "", eng: "" }));
    // const inputValuesSection2 = ref(new Array(30).fill({ kor: "", eng: "" }));
    const inputValuesSection1 = ref(new Array(15).fill(0).map(createEmptyItem));
    const inputValuesSection2 = ref(new Array(15).fill(0).map(createEmptyItem));

    const handleCheckData = () => {
      console.log("#inputValuesSection1");
      console.log(inputValuesSection1.value);
      console.log(5555);
      console.log({ ...inputValuesSection1.value });
      console.log("#inputValuesSection2");
      console.log(inputValuesSection2.value);
    };

    onMounted(() => {
      inputValuesSection1.value = [
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
        {
          eng: "play",
          kor: "놀다",
        },
      ];
    });

    return {
      inputValuesSection1,
      inputValuesSection2,
      handleCheckData,
    };
  },
};
</script>
  
<style scoped>
.vocabulary-sheet {
  width: 70%;
  margin: auto;
  border: 1px solid red;
  height: auto;
}

.vocabulary-sheet__body {
  display: flex;
  justify-content: center;
}

.section {
  width: 42%;
  display: flex;
  flex-direction: column;
}
.p-inputtext {
  border: 1px solid blue;
}

.item {
  width: 100%;
  display: flex;
  gap: 10px;
}

.item .number {
  flex: 0 0 100px;
  line-height: 2;
  padding: 10px;
  display: inline-block;
  border: 1px solid red;
}

.header {
  background: #6eadd7;
  /* color:#fff */
}

.header .header__inner {
  width: 85%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid red;
  position: relative;
}

.sub-title {
  position: absolute;
  bottom: -50%;
  left: 0px;
  transform: translateY(-50%);
  height: 50px;
  line-height: 50px;
  text-indent: 20px;
  font-weight: 700;
  background: #2c82b7;
  color: #fff;
  width: 40%;
  border-radius: 6px;
}

.sub-info {
  position: absolute;
  bottom: -50%;
  right: 0px;
  transform: translateY(-50%);
  height: 50px;
  line-height: 50px;
  text-indent: 20px;
  font-weight: 700;
  background: #fff;
  color: #000;
  width: 40%;
  border-radius: 6px;
}
</style>