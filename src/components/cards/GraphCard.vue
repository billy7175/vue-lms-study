<template>
  <div class="grapth-card">
    <div>
      <chart-card></chart-card>
    </div>
  </div>
</template>

<script>
import ChartCard from "../cards/ChartCard.vue";
export default {
  components: {
    ChartCard,
  },
  setup() {
    return {};
  },
};
</script>



<style scoped>
.grapth-card {
  width: 75%;
  border-radius: 20px;
  padding: 40px;
  opacity: 1;
  /* background-color: #e5e5f7; */
  /* background-image: radial-gradient(#444cf7 0.5px, transparent 0.5px),
    radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px); */
    background:#fff;
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}
</style>

