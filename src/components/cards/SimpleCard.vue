<template>
  <div class="simple-card" :class="[type, {'is-horizontal' : isHorizontal}]">
    <p class="simple-card__title">
      <i class="pi pi-user" style="margin-right:10px;" />
      {{ title }}</p>
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
  isHorizontal: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.simple-card {
  width: 300px;
  height: 180px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 700;
  border:1px solid #f1f1f1;
  backdrop-filter: sepia(90%);
  backdrop-filter: blur(1px);
  background-size: cover;
}

.simple-card.is-horizontal {
  height:100px;
  flex-direction: row;
  align-items: center;
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
  padding:10px 20px;
  border-radius: 6px;
  font-size:18px;
  color:#fff;
  background:#8A71D6;
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