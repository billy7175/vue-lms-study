<template>
  <div :class="[{ 'is-focused': isInputFocused }]" style="margin: 4px 0px">
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">A</span>
      <InputText ref="input" type="text" maxlength="10" v-model="optionValue" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    
    const optionValue = ref("");
    const input = ref(null);
    const isInputFocused = ref(false);
    
    const isFocused = ref(false )


    const handleFocus = () => {
      isInputFocused.value = true;
    };

    const handleBlur = () => {
      isInputFocused.value = false;
    };
    onMounted(() => {
      console.log("#question option is mounted", input);
      if (input.value) {
        isFocused.value = input.value.$el.activeElement
        input.value.$el.addEventListener("focus", handleFocus);
        input.value.$el.addEventListener("blur", handleBlur);
      }
    });
    return {
      input,
      optionValue,
      isInputFocused,
    };
  },
};
</script>


<style scoped>
.is-focused {
  /* border:1px solid red; */
  outline:1px solid #10b981;
  box-shadow: 0 0 0 0.2rem #a7f3d0;
}
.question-option {
  display: flex;
  border: 1px solid #fff;
  width: 100%;
}

.question-option__prefix {
  padding: 10px;
  box-sizing: border-box;
}

.p-inputgroup-addon {
  border: none;
  background: transparent;
  padding: 10px 0px;
  background: #f6f6f6;
}

.p-inputtext {
  border: none;
  text-indent: 5px;
  background: #f6f6f6;
}

/* p-inputgroup-addon */
.p-inputtext:focus {
  /* border:1px solid red; */
  border: none;
  outline: none;
  box-shadow: none;
}
</style>