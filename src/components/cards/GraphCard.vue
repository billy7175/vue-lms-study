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



<style lang="scss" scoped>
@import '../../../src/assets/styles/mixins.scss';

.grapth-card {
  width: 75%;
  border-radius: 20px;
  padding: 40px;
  opacity: 1;
  @include glassmorphism(4px, 0.1);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}
</style>

