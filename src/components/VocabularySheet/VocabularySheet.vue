<template>
  <div class="vocabulary-sheet">
    <div>
      <input
        class="form-control form-control-sm"
        type="file"
        @change="parseData"
        ref="fileupload"
      />
    </div>
    <header class="header">
      <div class="header__inner">
        <div class="sub-title">Unit 02 BUSY BEES</div>
        <div class="sub-info">
          Date __________ / __________
          <span style="margin-left: 10px; display: inline-block"
            >Name : __________
          </span>
        </div>
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
        <div
          v-for="(x, idx) in inputValuesSection1"
          class="item -left"
          :key="x"
        >
          <span class="number">0{{ idx + 1 }}</span>
          <InputText
            class="eng"
            type="text"
            v-model="inputValuesSection1[idx].eng"
          />
          <InputText type="text" v-model="inputValuesSection1[idx].kor" />
        </div>
      </section>
      <section class="section -right">
        <div
          v-for="(x, idx) in inputValuesSection2"
          class="item -righ"
          :key="x"
        >
          <span class="number">0{{ idx + 1 + 25 }}</span>
          <InputText
            class="eng"
            type="text"
            v-model="inputValuesSection2[idx].eng"
          />
          <InputText type="text" v-model="inputValuesSection2[idx].kor" />
        </div>
      </section>
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import { read, utils } from "xlsx";
export default {
  setup() {
    const createEmptyItem = () => ({ kor: "", eng: "" });
    // const inputValuesSection1 = ref(new Array(30).fill({ kor: "", eng: "" }));
    // const inputValuesSection2 = ref(new Array(30).fill({ kor: "", eng: "" }));
    const inputValuesSection1 = ref(new Array(25).fill(0).map(createEmptyItem));
    const inputValuesSection2 = ref(new Array(25).fill(0).map(createEmptyItem));

    const handleCheckData = () => {
      console.log("#inputValuesSection1");
      console.log(inputValuesSection1.value);
      console.log(5555);
      console.log({ ...inputValuesSection1.value });
      console.log("#inputValuesSection2");
      console.log(inputValuesSection2.value);
    };

    onMounted(() => {
    });

    async function fileToJson(e) {
      const file = e.target.files[0];
      const blob = await file.arrayBuffer();
      const workbook = read(blob);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      return utils.sheet_to_json(worksheet);
    }

    async function parseData(e) {
      const json = await fileToJson(e);
      for (const x in json) {
        console.log("x ", x, typeof x);
        const item = json[x];
        if (Number(x) <= 24) {
          if (item && item.korean && item.english) {
            inputValuesSection1.value[x].kor = item.korean;
            inputValuesSection1.value[x].eng = item.english;
          }
        } else {
          console.log(3333333333)
          console.log(inputValuesSection2.value)
          console.log(item)
          inputValuesSection2.value[x - 25].kor = item.korean;
          inputValuesSection2.value[x - 25].eng = item.english;
        }
        if (Number(x) === 50) break;
      }
    }

    return {
      inputValuesSection1,
      inputValuesSection2,
      handleCheckData,
      fileToJson,
      parseData,
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
  padding: 40px 0px;
  gap: 30px;
}

.section {
}

.p-inputtext {
  border: 1px solid #333;
  border-radius: 0px;
  flex: 0 0 150px;
  border-bottom: none;
}

.p-inputtext.eng {
  border-left: none;
  border-right: none;
}

.item {
  width: 100%;
  display: flex;
}

.item .number {
  flex: 0 0 60px;
  line-height: 2;
  padding: 10px;
  display: inline-block;
  border: 1px solid #333;
  border-bottom: none;
}

.item:last-child .number {
  border-bottom: 1px solid #333;
}

.item:last-child .p-inputtext {
  border-bottom: 1px solid #333;
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