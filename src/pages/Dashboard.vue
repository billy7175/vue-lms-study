<template>
  <div class="dashboard">
    <section style="padding: 20px 0px; display: flex; gap: 40px">
      <list-card title="Best Score"></list-card>
      <list-card title="Loggined-In Users" type="status"></list-card>
      <div class="test">
        <p>This section is in development</p>
      </div>
      <!-- <list-card title="Underperforming Students"></list-card> -->
    </section>
    <div>
      <engagement-card :data="dashboard"></engagement-card>
    </div>
    <section>
      <div class="card__wrapper">
        <!-- <performance-card></performance-card> -->
        <!-- <graph-card></graph-card> -->
      </div>
    </section>
    <!-- <section style="margin-top: 50px">
      <h2 class="card__title">Popular Courses</h2>
      <div class="card__wrapper">
        <simple-card title="English Grammmars In Use" contents="13$"></simple-card>
        <simple-card title="Japanese Grammars In Use" contents="7$" mainBackground="red"></simple-card>
        <p>
          <iframe src="https://www.youtube.com/embed/jSJM9iOiQ1g" width="560" height="315" frameborder="0"
            allowfullscreen>
          </iframe>
        </p>
      </div>
    </section> -->
  </div>
</template>

<script>
import { onMounted, reactive, toRef } from "vue";
import SimpleCard from "../components/cards/SimpleCard.vue";
import PerformanceCard from "../components/cards/PerformanceCard.vue";
import EngagementCard from "../components/cards/EngagementCard.vue";
import GraphCard from "../components/cards/GraphCard.vue";
import { getDashboard } from "../apis/dashboard";
import ChartCard from "../components/cards/ChartCard.vue";
import ListCard from "../components/cards/ListCard.vue";
export default {
  components: {
    SimpleCard,
    PerformanceCard,
    EngagementCard,
    ChartCard,
    GraphCard,
    ListCard,
  },
  setup() {
    // const dashboard = reactive({
    //   studentCount: 0,
    //   teacherCount: 0,
    //   classCount: 0,
    //   questionCount: 0,
    // });

    const dashboard = reactive({
      student: {
        label: "Student",
        count: 0,
      },
    });

    onMounted(async () => {
      const { data } = await getDashboard();
      console.log(55555, data);
      Object.assign(dashboard, data); // #ChekcPoint
    });

    return {
      dashboard,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../src/assets/styles/mixins.scss';

.test {
  width: 80%;
  border: 2px solid red;
  // @include glassmorphism(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 36px;
  font-weight: 700;
}

.dashboard {}

.card__title {
  /* color:#fff; */
  padding: 10px;
}

.card__wrapper {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  /* background:#fff; */
  padding: 20px 0px;
  border-radius: 20px;
  /* background:url('../assets/space.jpg'); */
}

h2 {
  padding-left: 5px;
  margin-bottom: 5px;
}
</style>