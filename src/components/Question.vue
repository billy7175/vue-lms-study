<template>
  <div>
    <div style="margin-bottom:10px;">
      <span>{{ data.number }}</span>
      <el-input
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        v-model="data.question"
        disabled
      />
    </div>
    <question-options
      :data="data.options"
    ></question-options>
  </div>
</template>

<script>
import QuestionOptions from "./QuestionOptions.vue";
export default {
  components: { QuestionOptions },
  props:{
    data: {
      type: Object,
      default: () => {},
    }
  },
  setup(props) {
    const sampleData = props.data
    console.log('#sampleData', sampleData)
    console.log('#sampleData', sampleData.number)
    console.log('#sampleData', sampleData.options)

    return {
      data : sampleData
    };
  },
};
</script>


<style scoped>
</style>