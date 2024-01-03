<template>
  <div class="dashboard">
    <section>
      <h2>Analysis</h2>
      <div class="card__wrapper">
        <simple-card
          title="학생 수"
          contents="33명"
          type="type-01"
          is-horizontal
        ></simple-card>
        <simple-card
          title="선생 수"
          contents="2명"
          type="type-02"
          is-horizontal
        ></simple-card>
        <simple-card
          title="반"
          contents="3개"
          type="type-03"
          is-horizontal
        ></simple-card>
        <simple-card
          title="생성된 문제 수"
          contents="3개"
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

<script setup>
import SimpleCard from "../components/cards/SimpleCard.vue";
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