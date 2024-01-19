<template>
  <div class="vocabulary-sheet">
    <header
      data-html2canvas-ignore="true"
      style="
        display: flex;
        justify-content: flex-end;
        gap: 20px;
        padding: 30px 0px;
      "
    >
      <input
        v-if="isCreateMode"
        id="file"
        accept=".xlsx, .numbers"
        class="form-control form-control-sm p-button"
        type="file"
        @change="parseData"
        ref="fileupload"
        style="display: none"
      />
      <label
        v-if="isCreateMode"
        for="file"
        class="p-button"
        style="font-weight: 700"
      >
        <i class="pi pi-upload" style="margin-right: 10px"></i>
        Excel Upload
      </label>

      <!-- <FileUpload
        mode="basic"
        :maxFileSize="1000000"
        @upload="parseData"
        :auto="true"
        chooseLabel="Excel Upload"
        accept=".xlsx,.pdf,.csv,.xls,.numbers"
      /> -->

      <!-- accept="image/*"  -->
      <Button
        v-if="!isEditingMode"
        @click="handleEditButton"
        label="Change To Edit Mode"
        icon="pi pi-external-link"
        severity="secondary"
      />

      <Button
        v-if="isEditingMode"
        @click="handleCancelButton"
        label="Cancel Edit Mode"
        icon="pi pi-external-link"
        severity="danger"
      />
      <Button
        v-if="isEditingMode"
        @click="handleUpdateButton"
        label="Update"
        icon="pi pi-external-link"
        severity="info"
      />

      <Button
        v-if="!isEditingMode"
        @click="handleDownload"
        label="PDF Download"
        icon="pi pi-external-link"
        severity="danger"
      />

      <Button
        v-if="isCreateMode"
        @click="handleSave"
        label="Save Data"
        icon="pi pi-save"
        severity="info"
      />
    </header>
    <header class="header">
      <div class="header__inner">
        <div class="sub-title">Unit 02 BUSY BEES</div>
        <div class="sub-info">
          Date <Calendar v-model="date" dateFormat="yy-mm-dd" />
          <span style="margin-left: 10px; display: inline-block"
            >Name :
            <InputText
              class="input-name"
              type="text"
              v-model="userName"
              style="width: 100px"
            />
          </span>
        </div>
        <!-- <h2>바로 읽는 배경지식 독해 LEVEL 1</h2> -->
        <h2 class="title" v-if="isEditingMode">
          <InputText
            class="input-title"
            type="text"
            v-model="title"
            placeholder="Enter Title"
          ></InputText>
        </h2>
        <div v-else>
          <h2 class="title">
            {{ title }} 1
          </h2>
          <!-- <InputText
            type="text"
            v-model="title"
            style="
              background: transparent;
              color: #000;
              border: none;
              box-shadow: none;
              font-size: 22px;
              font-weight: 700;
            "
          /> -->
        </div>

        <strong> Vocaburary List </strong>
      </div>
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
            size="small"
          />
          <InputText
            type="text"
            v-model="inputValuesSection1[idx].kor"
            size="small"
          />
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
import axios from "axios";
import { useRouter } from "vue-router";
import { ref, onMounted, watch, reactive } from "vue";
import { read, utils } from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useUserState } from "../../stores/user.js";
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    isCreateMode: {
      type: Boolean,
      default: true,
    },
    isEditingMode: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const date = ref(new Date());
    const userStore = useUserState();
    const userId = userStore.user.user._id;
    const data = reactive(props.data);

    const title = ref("123");
    const userName = ref("test-username");
    const modelValue = props.modelValue;

    watch(
      data,
      (newVal) => {
        // const
        if (newVal.value && newVal.value._id) {
          const list = newVal.value.data;

          title.value = newVal.value.title;
          for (const x in list) {
            const row = list[x];
            if (Number(x) < 25) {
              inputValuesSection1.value[x].eng = row.eng;
              inputValuesSection1.value[x].kor = row.kor;
            } else {
              inputValuesSection2.value[x - 25].eng = row.eng;
              inputValuesSection2.value[x - 25].kor = row.kor;
            }
          }
        }
      },
      {
        deep: true,
      }
    );
    const handleSave = async () => {
      const body = {
        title: title.value,
        name: userName.value,
        date: date.value,
        register: userId,
        data: [...inputValuesSection1.value, ...inputValuesSection2.value],
      };

      if (!title.value) return alert("제목을 입력해주세요.");
      if (!userName.value) return alert("이름을 입력해주세요.");
      if (!date.value) return alert("날짜를 입력해주세요.");
      console.log("#body", body);
      const res = await axios.post(
        "http://127.0.0.1:3000/api/vocabulary-sheet",
        body
      );

      context.emit("create");
      console.log("#res", res);
    };

    const handleDownload = () => {
      console.log(111, handleDownload);
      const isConfiremd = confirm("Do you want to download it as PDF file.");
      if (isConfiremd) {
        makePDF();
      }
    };
    const makePDF = async (selector = "body") => {
      const tagName = ".vocabulary-sheet";
      window.html2canvas = html2canvas;
      let pdf = new jsPDF("p", "mm", "a4");

      let ele = document.querySelector(tagName);

      if (!ele) {
        console.warn(selector + " is not exist.");
        return false;
      }

      try {
        const canvas = await html2canvas(ele);

        let position = 0;
        const imgData = canvas.toDataURL("image/png");

        const pageWidth = 210; // canvas width
        const pageHeight = 295; // canvas height
        let width = ele.offsetWidth;
        let height = ele.offsetHeight;
        let imgHeight = (pageWidth * height) / width;

        pdf.addImage(
          imgData,
          "png",
          0,
          position,
          pageWidth,
          imgHeight,
          undefined,
          "slow"
        );

        let heightLeft = imgHeight;
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "png", 0, position, pageWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("your_file_name.pdf"); // Change the file name as needed
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };
    const downloadPDF = () => {
      const pdf = new jsPDF();
      // Add content to the PDF
      pdf.text("Hello, this is a PDF!", 10, 10);

      // Save the PDF
      pdf.save("your_file_name.pdf");
    };
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

    onMounted(() => {});

    async function fileToJson(e) {
      const file = e.target.files[0];
      const blob = await file.arrayBuffer();
      const workbook = read(blob);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      return utils.sheet_to_json(worksheet);
    }

    async function parseData(e) {
      console.log("#parseData upload", e);
      const json = await fileToJson(e);

      console.log("#json", json);
      for (const x in json) {
        console.log("x ", x, typeof x);
        const item = json[x];
        if (Number(x) <= 24) {
          if (item && item.korean && item.english) {
            inputValuesSection1.value[x].kor = item.korean;
            inputValuesSection1.value[x].eng = item.english;
          }
        } else {
          inputValuesSection2.value[x - 25].kor = item.korean;
          inputValuesSection2.value[x - 25].eng = item.english;
        }
        if (Number(x) === 50) break;
      }
    }

    const handleEditButton = () => {
      context.emit("edit");
    };

    const handleCancelButton = () => {
      context.emit("edit");
    };

    const handleUpdateButton = async () => {
      console.log("#handleUpdateButton");
      console.log("#data", data);
      const body = {
        title: title.value,
        name: userName.value,
        date: date.value,
        register: userId,
        data: [...inputValuesSection1.value, ...inputValuesSection2.value],
      };

      try {
        const res = await axios.put(
          `http://127.0.0.1:3000/api/vocabulary-sheet/${data.value._id}`,
          body
        );

        context.emit("edit");
        await alert('Updated successfully');
      } catch (error) {
        console.log('#error', error)
      }
    };

    return {
      inputValuesSection1,
      inputValuesSection2,
      handleCheckData,
      fileToJson,
      parseData,
      downloadPDF,
      handleDownload,
      makePDF,
      handleSave,
      handleEditButton,
      handleCancelButton,
      handleUpdateButton,
      data,
      modelValue,
      title,
      userName,
      date,
    };
  },
};
</script>

<style scoped>
h2 {
  margin: 0px;
}
.title {
  margin:20px 0px;
  width: 500px;
  height: 40px;
  display: inline-block;
}
.vocabulary-sheet {
  width: 70%;
  margin: auto;
  height: auto;
}

.vocabulary-sheet__body {
  display: flex;
  justify-content: center;
  padding: 60px 0px;
  gap: 30px;
  border: 1px solid #c9c2c2;
  border-top: none;
}

.p-inputtext {
  border: 1px solid #333;
  border-radius: 0px;
  flex: 0 0 150px;
  border-bottom: none;
  padding: 10px;
  /* text-indent: 10px; */
  /* height:30px;  */
  /* height:40px */
}

.p-inputtext.eng {
  border-left: none;
  border-right: none;
}

.item {
  width: 100%;
  height: 40px;
  display: flex;
}

.item .number {
  flex: 0 0 50px;
  height: 40px;
  line-height: 40px;
  text-indent: 10px;
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
  width: 50%;
  border-radius: 6px;
}
</style>

<style>
.vocabulary-sheet .p-calendar .p-inputtext {
  border: none;
  border-bottom: 2px solid #000;
  border-radius: 0px;
}

.vocabulary-sheet .input-title {
  width: 350px;
}

.vocabulary-sheet .input-name {
  border: none;
  border-bottom: 2px solid #000;
}
</style>



