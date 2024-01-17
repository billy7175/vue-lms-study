<template>
  <div>
    <div>
      <vocabulary-sheet :data="vocaData"></vocabulary-sheet>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import VocabularySheet from "../components/VocabularySheet/VocabularySheet.vue";
export default {
  components: {
    VocabularySheet,
  },
  setup(props) {
    const vocaData = reactive({})
    const router = useRoute();
    const id = router.params.id;
    const fetchVocabularySheetDetail = async (id) => {
      if (!id) return alert("id 정보가 없더열");
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:3000/api/vocabulary-sheets/${id}`
        );
        vocaData.value = data
      } catch (error) {
        alert("실패!!");
      }
    };

    onMounted(() => {
      console.log('#on-mounted')
      fetchVocabularySheetDetail(id);
    });

    return {
      id,
      fetchVocabularySheetDetail,
      vocaData
    };
  },
};
</script>