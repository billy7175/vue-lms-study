<template>
  <div class="comment">
    <section class="comment__body">
      <div class="comment__row">
        <Avatar
          :image="data.imageUrl"
          class="flex align-items-center justify-content-center mr-2"
          size="small"
          shape="circle"
        />
        <span>{{ data.name }} </span>
        <span class="sub-color">1 hour ago</span>
        <div
          style="
            display: flex;
            align-items: center;
            margin-left: auto;
            color: #a09999;
          "
        >
          <i class="pi pi-ellipsis-v"></i>
        </div>
      </div>
      <div>
        <p>
          {{ data.comment }}
        </p>
      </div>
      <div style="display: flex; gap: 10px; justify-items: center">
        <i style="color: red" class="pi pi-heart-fill"></i>
        <i style="" class="pi pi-bookmark"></i>
        <div class="sub-color" style="margin-bottom: 0px">reply</div>
      </div>
    </section>
    <section v-if="data.subComments && data.subComments">
      <div  class="sub-comment" v-for="(subComment, idx) in data.subComments" :key="idx">
        <div class="comment__row">
          <Avatar
            :image="subComment.imageUrl"
            class="flex align-items-center justify-content-center mr-2"
            size="small"
            shape="circle"
          />
          <span>{{ subComment.name}}</span>
          <span class="sub-color">1 hour ago</span>
          <div
            style="
              display: flex;
              align-items: center;
              margin-left: auto;
              color: #a09999;
            "
          >
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </div>
        <div>
          <p>
            {{ subComment.comment}}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  components: {},
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup() {},
};
</script>
<style lang="scss" scoped>
.comment {
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  &__body {
    // border-left:5px solid rgb(70, 69, 69);
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.sub-comment {
  // border: 1px solid blue;
  margin: 10px;
  padding-left: 10px;
  border-left: 5px solid rgb(70, 69, 69);
  border-left: 5px solid rgb(150, 147, 147);
}

.sub-color {
  color: #a09999;
}
</style>