<template>
  <div class="dashboard">
    <section>
      <h2>Analysis</h2>
      <div class="card__wrapper">
        <simple-card
          title="학생 수"
          :contents="dashboard.studentCount"
          type="type-01"
          is-horizontal
        ></simple-card>
        <simple-card
          title="선생 수"
          :contents="dashboard.teacherCount"
          type="type-02"
          is-horizontal
        ></simple-card>
        <simple-card
          title="반"
          :contents="dashboard.classCount"
          type="type-03"
          is-horizontal
        ></simple-card>
        <simple-card
          title="생성된 문제 수"
          :contents="dashboard.questionCount"
          type="type-04"
          is-horizontal
        ></simple-card>
      </div>
    </section>
    <section style="margin-top: 50px">
      <h2>Popular Courses</h2>
      <div class="card__wrapper">
        <simple-card
          title="English Grammmars In Use"
          contents="13$"
        ></simple-card>
        <simple-card
          title="Japanese Grammars In Use"
          contents="7$"
          mainBackground="red"
        ></simple-card>
        <p>
          <iframe
            src="https://www.youtube.com/embed/jSJM9iOiQ1g" 
            width="560"
            height="315"
            frameborder="0"
            allowfullscreen
          >
          </iframe>
        </p>
      </div>
    </section>
    <section style="margin-top: 50px">
      <h2>Members</h2>
      <DataTable
        stripedRows
        selectionMode="single"
        :value="[
          {
            date: '2023-12-12',
            title: '파트 5문제 입니다~!',
            description: 'No. 189, Grove St, Los Angeles',
            rating: 3,
            isPublic: 'success',
          },
          {
            date: '2023-12-12',
            title: '파트 5문제 입니다~!',
            description: 'No. 189, Grove St, Los Angeles',
            rating: 3,
            isPublic: 'success',
          },
          {
            date: '2023-12-12',
            title: '파트 5문제 입니다~!(상)',
            description: 'take your time and stay focused.',
            rating: 5,
            isPublic: 'success',
          },
          {
            date: '2023-12-12',
            title: '파트 5문제 입니다~!(상)',
            description: 'take your time and stay focused.',
            rating: 5,
            isPublic: 'success',
          },
          {
            date: '2023-12-12',
            title: '파트 5문제 입니다~!(상)',
            description: 'take your time and stay focused.',
            rating: 1,
            isPublic: 'success',
          },
          {
            date: '2023-12-12',
            title: '파트 5문제 입니다~!(상)',
            description: 'take your time and stay focused.',
            rating: 0,
            isPublic: 'success',
          },
        ]"
        tableStyle="min-width: 50rem"
        size="Normal"
      >
        <Column field="date" header="Date"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="rating" header="Reviews">
          <template #body="slotProps">
            <Rating
              :modelValue="slotProps.data.rating"
              readonly
              :cancel="false"
            />
          </template>
        </Column>
        <Column field="isPublic" header="Status">
          <template #body>
            <Tag value="info" severity="info" />
          </template>
        </Column>
      </DataTable>
    </section>
  </div>
</template>

<script>
import { onMounted, reactive, toRef } from "vue";
import SimpleCard from "../components/cards/SimpleCard.vue";
import { getDashboard } from "../apis/dashboard";
export default {
  components: {
    SimpleCard,
  },
  setup() {
    const dashboard = reactive({
      studentCount: 0,
      teacherCount: 0,
      classCount: 0,
      questionCount: 0,
    });

    onMounted(async () => {
      const { data } = await getDashboard();
      Object.assign(dashboard, data); // #ChekcPoint
    });

    return {
      dashboard,
    };
  },
};
</script>

<style scoped>
.card__wrapper {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
}

h2 {
  padding-left: 5px;
  margin-bottom: 5px;
}
</style>