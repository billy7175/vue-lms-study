<template>
  <div>
    <strong style="font-size: 20px">
      {{ id }}
    </strong>
    건에 대해서 보고 계셔유
    <div>
      <vocabulary-sheet></vocabulary-sheet>
    </div>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import VocabularySheet from "../components/VocabularySheet/VocabularySheet.vue";
export default {
  components: {
    VocabularySheet,
  },
  setup(props) {
    const router = useRoute();
    const id = router.params.id;

    const fetchVocabularySheetDetail = async (id) => {
      if (!id) return alert("id 정보가 없더열");
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:3000/api/vocabulary-sheets/${id}`
        );
        console.log('#data', data)
        // list.value = data;
      } catch (error) {
        alert("실패!!");
      }
    };
    return {
      id,
      fetchVocabularySheetDetail,
    };
  },
};
</script>