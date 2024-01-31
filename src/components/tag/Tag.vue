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
<style lang="scss" scoped>
.tag-wrapper {
  display: inline-flex;
  align-items: center;
  background: #daf2dd;
  padding: 8px 12px;
  border-radius: 10px;
  gap: 5px;

  &.is-not-active {
    background: #f6b3b3;
  }

  .tag-text {
    color: #4daa57;
  }

  &.is-not-active .tag-text {
    color: #dc504f;
  }
}

.tag {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #fff;
  position: relative;

  &.is-active {
    background: #4daa57;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: circle-pulse 1.5s infinite;
      box-shadow: 0 0 0 0 #4daa57;
    }
  }

  &.is-not-active {
    background: #dc504f;
  }
}

@keyframes circle-pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(77, 170, 87, 0.9);
  }

  50% {
    transform: scale(1);
    box-shadow: 0 0 0 8px rgba(77, 170, 87, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(77, 170, 87, 0);
  }
}
</style>