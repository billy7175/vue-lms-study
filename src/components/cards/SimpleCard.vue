<template>
  <div class="simple-card" :class="[type]">
    <p class="simple-card__title">{{ title }}</p>
    <div class="simple-card__contents">
      <span class="simple-card__contents-text" :class="[type]">{{
        contents
      }}</span>
    </div>
  </div>
</template>


<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  contents: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.simple-card {
  width: 300px;
  height: 180px;
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
  font-weight: 700;
}

.simple-card__contents {
  width: auto;
  font-size: 24px;
  display: inline-block;
}

.simple-card__contents-text {
  position: relative;
  padding: 10px;
  border-radius: 50%;
  color: #000;
}

.simple-card.type-01 {
  background: #d3e3fd;
}

.simple-card__contents-text.type-01 {
  background: #a8c7fa;
}

.simple-card.type-02 {
  background: #E3E3E3;
}

.simple-card__contents-text.type-02 {
  background: #C7C7C7;
}


.simple-card.type-03 {
  background: #C2E7FF
}

.simple-card__contents-text.type-03 {
  background: #7FCFFF;
}

.simple-card.type-04 {
  background: #C4EED0;
}

.simple-card__contents-text.type-04 {
  background: #6DD58C;
}

.simple-card__contents-text::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 0px;
  width: 100%;
  height: 2px;
  opacity: 0.6;
}
</style>