<template>
  <div>
    <div>
      <div style="display: flex; justify-content: flex-end; padding-bottom: 20px">
      <Button label="Create" @click="handleCreate" />
    </div>
      <div v-if="list && list.length">
        <DataTable
          :value="list"
          size="Normal"
          @rowSelect="(row) => handleSelect(row.data)"
          selectionMode="single"
          paginator
          :rows="10"
        >
          <Column field="date" header="Date" style="width:300px;"></Column>
          <Column field="title" header="Title"> </Column>
          
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs'
import { ref, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import VocabularySheet from "../components/VocabularySheet/VocabularySheet.vue";
export default {
  components: {
    VocabularySheet,
  },
  setup() {
    const isCreatePage = ref(false)
    const route = useRoute()
    const router = useRouter()
    const list = ref([]);
    const selectedRow = reactive({});
    const fetchVocabularySheets = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:3000/api/vocabulary-sheets"
        );
        list.value = data.map((x) => {
        return {
          ...x,
          date: dayjs(x.date).format("YYYY.MM.DD"),
        };
      });
      } catch (error) {
        alert("실패!!");
      }
    }
    onMounted(async () => {
      const routeName = route.name
      if(routeName === 'vocabulary-create') isCreatePage.value = true
      console.log('#route', route)
      console.log('#route', route.name)
      fetchVocabularySheets()
    });

    const handleCreate = () => {
      // fetchVocabularySheets()
      router.push({
        name: 'vocabulary-create'
      })
    };

    const handleSelect = (data) => {
      selectedRow.value = data;
      router.push({
        name : 'vocabulary',
        params: {
          id: selectedRow.value._id
        }
      })
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