<template>
  <div>
    <div>
      <div v-if="list && list.length">
        <DataTable
          :value="list"
          size="Normal"
          @rowSelect="(row) => handleSelect(row.data)"
          selectionMode="single"
          paginator
          :rows="5"
        >
          <Column field="title" header="Title"> </Column>
          <Column field="date" header="Date"> </Column>
        </DataTable>
      </div>
    </div>
    <vocabulary-sheet
      @create="handleCreate"
      :data="selectedRow"
    ></vocabulary-sheet>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import VocabularySheet from "../components/VocabularySheet/VocabularySheet.vue";
export default {
  components: {
    VocabularySheet,
  },
  setup() {
    const list = ref([]);
    const selectedRow = reactive({});
    const fetchVocabularySheets = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:3000/api/vocabulary-sheets"
        );
        list.value = data;
      } catch (error) {
        alert("실패!!");
      }
    }
    onMounted(async () => {
      fetchVocabularySheets()
    });

    const handleCreate = () => {
      fetchVocabularySheets()
    };

    const handleSelect = (data) => {
      selectedRow.value = data;
    };

    return {
      list,
      handleCreate,
      handleSelect,
      selectedRow
    };
  },
};
</script>

<style scoped>
</style>