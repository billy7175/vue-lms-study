<template>
  <div>
    MessabeBox
  </div>
</template>


<script>
export default {
  setup() {
    const test = () => {
      console.log('console.log from message box')
    }
    return {
      test,
      wow: 123
    }
  }
}
</script>
