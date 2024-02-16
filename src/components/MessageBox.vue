<template>
  <div v-show="isVisible" class="message-box global-alert">
    <div class="message-box__inner">
      <h2 style="margin-bottom:10px">Alert</h2>
      <p v-if="useHtml" v-html="label"></p>
      <p v-else>{{ label }}</p>
      <div style="display:flex; gap:20px; margin-top:30px;">
        <Button severity="primary" @click="handleConfirm"
          style="background: #F3A603; color:#000; border:none; font-weight: 900; padding:10px 30px;">Delete</Button>
        <Button severity="info" @click="handleCancel"
          style="background: none; color:#F3A603; border:1px solid #F3A603; font-weight: 900; padding:10px 30px;">Cancel</Button>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue'
export default {
  props: {
    useHtml: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Are you sure you want to delete this item?<br> This action cannot be undone.'
    },
    onConfirm: {
      type: Function,
      required: true
    },
    onCancel: {
      type: Function,
      required: true
    },
    onDelete: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const isVisible = ref(true)
    const test = () => {
      console.log('console.log from message box')
    }

    const handleConfirm = () => {
      console.log('confirm')
      props.onConfirm()
    }

    const handleCancel = () => {
      isVisible.value = false
      // props.onCancel()
    }
    return {
      isVisible,
      handleConfirm,
      handleCancel,
      test,
      wow: 123,
      sampleLabel: 'Are you sure you want to delete this item?<br> This action cannot be undone.'
    }
  }
}
</script>

<style lang="scss" scoped>
.message-box {
  background: rgba(1, 0, 0, 0.388);
  background: #FFF3D0;
  display: flex;
  justify-content: center;
  align-items: center;

  h2,
  p {
    padding: 0px;
    margin: 0px;

  }

  &__inner {
    text-align: center;
    min-width: 300px;
    max-width: 600px;
    height: auto; // background: #e0d170;
    background: #fff;
    padding: 40px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: #000;

  }

  &__label {
    font-size: 18px;
    color: #000;
    white-space: pre-wrap;
    // word-wrap: break-word;
    margin-top: 100px;
  }
}



.global-alert {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100vh;
  // border: 1px solid red;
  // background: black;
  // opacity: 0.5;
}
</style>