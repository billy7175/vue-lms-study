<template>
  <div>
    <h5>문제 생성</h5>
    <Button
      label="Create Question"
      icon="pi pi-external-link"
      @click="openBasic"
      style="margin-bottom: 50px"
    />
    <Dialog
      header="CREATE QUESTION"
      :visible="displayBasic"
      style="width: 800px; padding: 20px; background: #fff"
    >
      <div style="height: 30px"></div>
      <h3>INSERT QUESTION</h3>
      <Textarea
        style="width: 100%; padding: 10px"
        v-model="value1"
        rows="5"
        cols="30"
      />

      <section class="option-section">
        <question-options></question-options>
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
              label="Preview"
              icon="pi pi-check"
              @click="closeBasic"
              autofocus
            />
          </div>
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              @click="closeBasic"
              class="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              @click="closeBasic"
              autofocus
            />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import QuestionOptions from "@/components/questionOptions.vue";
export default {
  components: {
    QuestionOptions,
  },
  data() {
    return {
      displayBasic: false,
      value1: "",
      displayPosition: false,
      position: "center",
    };
  },
  methods: {
    openBasic() {
      this.displayBasic = true;
    },
    closeBasic() {
      this.displayBasic = false;
    },
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