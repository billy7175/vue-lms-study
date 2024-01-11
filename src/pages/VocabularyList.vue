<template>
  <div>
    <div>api list data area
        <div v-if="list && list.length">
            <pre>
                {{ list }}
            </pre>
            <!-- <div v-for="(x, idx) in list" :key="idx">
                {{x.title}}
            </div> -->
        </div>
    </div>
    <vocabulary-sheet @create="handleCreate"></vocabulary-sheet>

  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import VocabularySheet from "../components/VocabularySheet/VocabularySheet.vue";
export default {
  components: {
    VocabularySheet,
  },
  setup() {
    const list = ref([]);
    onMounted(async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:3000/api/vocabulary-sheets"
        );
        list.value = data;
      } catch (error) {
        alert("실패!!");
      }
    });

    const handleCreate = () => {};

    return {
      list,
      handleCreate,
    };
  },
};
</script>

<style scoped>
</style>