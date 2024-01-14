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
  /* box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2); */
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background:#222223;
  color:var(--dark--font--color);
  font-weight: 700;
  border:2px solid rgb(56, 54, 54);
  background: #FFF27A;
  color:#000;

  /* background:var(--dark--background--color__hover);
  color:#fff;
  border:none; */
}

.simple-card.is-horizontal {
  height:70px;
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
  position: relative;
  padding: 10px;
  border-radius: 30%;
  font-size:18px;
  /* color:var(--dark--font--color); */
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