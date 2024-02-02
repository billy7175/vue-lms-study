<template>
  <div>
    <div>
      <vocabulary-sheet :data="vocaData" @edit="onEdit" :isCreateMode="isCreateMode"
        :isEditingMode="isEditingMode"></vocabulary-sheet>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, reactive } from "vue";
import VocabularySheet from "../components/VocabularySheet/VocabularySheet.vue";
export default {
  components: {
    VocabularySheet,
  },
  setup(props) {
    const isCreateMode = ref(false)
    const isEditingMode = ref(true)
    const vocaData = reactive({})
    const route = useRoute();
    const router = useRouter()
    const id = route.params.id;
    const fetchVocabularySheetDetail = async (id) => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:3000/api/vocabulary-sheets/${id}`
        );
        if (!data) return alert("id 정보가 없더열");
        vocaData.value = data
      } catch (error) {
        alert("실패!!");
        router.push({
          name: 'vocabulary-detail'
        })

      }
    };

    const onEdit = () => {
      isEditingMode.value = !isEditingMode.value
    }

    onMounted(() => {
      const routeName = route.name
      if (routeName === 'vocabulary-create') isCreateMode.value = true

      if (!isCreateMode.value) {
        isEditingMode.value = false
        fetchVocabularySheetDetail(id);
      }

    });

    return {
      id,
      isCreateMode,
      isEditingMode,
      fetchVocabularySheetDetail,
      vocaData,
      onEdit
    };
  },
};
</script>