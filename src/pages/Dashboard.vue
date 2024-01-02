<template>
  <div class="dashboard">
    <section>
      <h2>Analysis</h2>
      <div class="card__wrapper">
        <simple-card
          title="학생 수"
          contents="33명"
          type="type-01"
        ></simple-card>
        <simple-card
          title="선생 수"
          contents="2명"
          type="type-02"
        ></simple-card>
        <simple-card title="반" contents="3개" type="type-03"></simple-card>
        <simple-card title="생성된 문제 수" contents="3개" type="type-04"></simple-card>
      </div>
    </section>
    <section style="margin-top: 50px">
      <h2>Popular Courses</h2>
      <div class="card__wrapper">
        <simple-card title="English Grammmars In Use" contents="13$"></simple-card>
        <simple-card
          title="Japanese Grammars In Use"
          contents="7$"
          mainBackground="red"
        ></simple-card>
      </div>
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
    padding-left:5px;
    margin-bottom: 5px;
}
</style>