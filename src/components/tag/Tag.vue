<template>
  <template v-if="type === 'status'">
    <span :class="['tag-wrapper', isActive ? 'is-active' : 'is-not-active']">
      <span :class="['tag', isActive ? 'is-active' : 'is-not-active']"></span>
      <slot></slot>
      <span v-if="isActive" class="tag-text">Active</span>
      <span v-else class="tag-text">In-Active</span>
    </span>
  </template>
  <template v-if="type === 'text'">
    <span>
      <slot></slot>
    </span>
  </template>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    isActive: {
      type: Boolean,
      default: false
    },
    noText: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.tag-wrapper {
  display: inline-block;
  display: flex;
  align-items: center;
  background: #daf2dd;
  color: #4daa57;
  padding: 8px 12px;
  border-radius: 10px;
  gap: 5px;
}

.tag-wrapper.is-not-active {
  background: #f6b3b3;
}

.tag.is-active {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid #fff;
  background: #4daa57;
  border-radius: 50%;
  position: relative;
}

.tag.is-active::before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: circle-pulse 1.5s infinite;
  box-shadow: 0 0 0 0 #4daa57;
}


.tag-wrapper.is-not-active .tag-text {
  color: #dc504f;
}

.tag.is-not-active {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid #fff;
  background: #dc504f;
  border-radius: 50%;
}

@keyframes circle-pulse {
  0% {
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
    -webkit-box-shadow: 0 0 0 0 rgba(77, 170, 87, 0.9);
    box-shadow: 0 0 0 0 rgba(77, 170, 87, 0.9);
  }

  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-box-shadow: 0 0 0 8px rgba(77, 170, 87, 0);
    box-shadow: 0 0 0 8px rgba(77, 170, 87, 0);
  }

  100% {
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
    -webkit-box-shadow: 0 0 0 0 rgba(77, 170, 87, 0);
    box-shadow: 0 0 0 0 rgba(77, 170, 87, 0);
  }
}
</style>

