<template>
  <div class="performance-card">
    <h2 class="performnace-card__title">{{ title }}</h2>
    <div class="performance-card__body">
      <div class="performance-card__item">
        <strong class="performance-card__number">76%</strong>
        <span class="performance-card__text">Income</span>
      </div>
      <div class="performance-card__item">
        <strong class="performance-card__number">76%</strong>
        <span class="performance-card__text">Income</span>
      </div>
    </div>
    <div>
      <div class="performance-card__sentence">
        <span>
          <i class="pi pi-check"></i>
        </span>
        <p>Spending course was taken</p>
      </div>
      <div class="performance-card__sentence">
        <span>
          <i class="pi pi-check"></i>
        </span>
        <p>Spending course was taken</p>
      </div>
      <div class="performance-card__sentence">
        <span>
          <i class="pi pi-check"></i>
        </span>
        <p>Spending course was taken</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      default: "Performance",
    },
  },
  setup() {
    return {};
  },
};
</script>
<style scoped>
.performance-card {
  width: 330px;
  height: auto;
  border-radius: 20px;
  background: #0f1422;
  padding: 20px;
  color: #fff;
  /* background: #DABEA9; */
  /* color:#000; */
}
.performnace-card__title {
  margin: 0px;
  padding:0px 10px;
}

.performance-card__body {
  display: flex;
  padding: 40px 0px;
}

.performance-card__item {
  width: 50%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-direction: column;
}

.performance-card__number {
  font-size: 36px;
}

.performance-card__text {
  color: #757680;
}

.performance-card__sentence {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.performance-card__sentence span {
  padding: 8px;
  background: #ff4c25;
  border-radius: 50%;
  /* color:#fff; */
  font-size: 12px;
}

.performance-card__sentence:nth-of-type(1) span {
  background: #ff4c25;
}

.performance-card__sentence:nth-of-type(2) span {
  background: #61dae0;
}

.performance-card__sentence:nth-of-type(3) span {
  background: #d6b7a1;
}
</style>