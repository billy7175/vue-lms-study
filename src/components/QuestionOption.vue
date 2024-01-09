<template>
  <div :class="[{ 'is-focused': isInputFocused }]" style="margin: 4px 0px;">
    <div class="p-inputgroup">
      <span class="p-inputgroup-addon">{{ label }}</span>
      <InputText
        ref="input"
        @focus="handleFocus"
        @blur="handleBlur"
        type="text"
        maxlength="20"
        :value="modelValue"
        @change="handleChange"
        :disabled="isDisabled"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    label: {
      type: String,
      default: "A",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    disabled : {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const input = ref(null)
    const modelValue = ref(props.modelValue);
    const isDisabled = ref(props.disabled)
    const isInputFocused = ref(false);

    const handleFocus = () => {
      isInputFocused.value = true;
    };

    const handleBlur = () => {
      isInputFocused.value = false;
    };

    const handleChange = (event) => {
      context.emit("update:modelValue", event.target.value);
    };

    const focus = () => {
      input.value.$el.focus()
    };
  

    watch(() => props.modelValue, (newVal , oldVal ) => {
      modelValue.value = newVal; 
    })

    return {
      input,
      modelValue: modelValue,
      isInputFocused,
      handleFocus,
      handleBlur,
      handleChange,
      focus,
      isDisabled
    };
  },
};
</script>


<style scoped>
.is-focused {
  /* border:1px solid red; */
  outline: 1px solid #10b981;
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
  padding: 10px 10px;
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