<template>
  <div class="simple-card">
    <p class="simple-card__title">
      {{ title }}
    </p>
    <div class="simple-card__contents">
      <span class="simple-card__contents-text">{{ contents }}</span>
    </div>
  </div>
</template>


<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "title",
  },
  contents: {
    type: String,
    default: "contents",
  },
});
</script>

<style scoped>
.simple-card {
  width: 250px;
  height: 150px;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.simple-card__title {
  display: flex;
  align-items: center;
}

.simple-card__contents {
  width: auto;
  font-size: 24px;
  display: inline-block;
}

.simple-card__contents-text {
  position: relative;
  color: #f1c40f;
}
.simple-card__contents-text::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 0px;
  background: #f1c40f;
  width: 100%;
  height: 2px;
  opacity: .6;
}
</style>