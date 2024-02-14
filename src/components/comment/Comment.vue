<template>
  <div class="comment">
    <section class="comment__body">
      <div class="comment__row">
        <Avatar :image="data.imageUrl" class="flex align-items-center justify-content-center mr-2" size="small"
          shape="circle" />
        <span>{{ data.user.name }} </span>
        <span class="sub-color">{{ elapsedTime(data.createdAt) }}</span>
        <div style="
            display: flex;
            align-items: center;
            margin-left: auto;
            color: #a09999;
          ">
          <!-- <i class="pi pi-ellipsis-v"></i> -->
          <i @click="handleDeleteComment(data)" class="pi pi-trash"></i>
        </div>
      </div>
      <div>
        <textarea v-model="data.comment" disabled
          style="border:none; height:auto; min-height: 80px; width:100%; background:none; padding:15px 0px;" />
      </div>
      <div style="display: flex; gap: 10px; justify-items: center; padding:10px 0px;">
        <i style="color: red" class="pi pi-heart-fill"></i>
        <i style="" class="pi pi-bookmark"></i>
        <div @click="handleReply" class="sub-color" style="margin-bottom: 0px">reply</div>
      </div>
      <div v-if="isSubCommentVisible" style="display:flex; gap:10px; align-items: center; padding:5px 0px;">
        <Avatar shape="circle"></Avatar>
        <textarea placeholder="댓글 추가..." v-model="subComment" style="width:80%;">
        </textarea>
        <i @click="handleCreateSubComment" class="pi pi-send"></i>

      </div>
    </section>
    <section v-if="subComments && subComments">
      <div class="sub-comment" v-for="(sub, idx) in subComments" :key="idx">
        <i class="pi pi-reply"></i>
        <section style="width:100%; padding-right:20px;">
          <div class="comment__row">
            <Avatar :image="sub.imageUrl" class="flex align-items-center justify-content-center mr-2" size="small"
              shape="circle" />
            <span>{{ sub.user.name }}</span>
            <span class="sub-color">{{ elapsedTime(sub.createdAt) }}</span>
            <div style="
                display: flex;
                align-items: center;
                margin-left: auto;
                color: #a09999;
              ">
              <i @click="handleDeleteSubComment(sub)" class="pi pi-trash"></i>
              <!-- <i class="pi pi-ellipsis-v"></i> -->
            </div>
          </div>
          <div>
            <p>
              {{ sub.comment }}
            </p>
          </div>
        </section>
      </div>
      <div v-if="isSubCommentLoading" style="display:flex; justify-content: center;">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      </div>
    </section>
  </div>
</template>


<script>
import { ref } from 'vue'
import axios from 'axios'
import { useUserState } from '../../stores/user'
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  setup(props, { emit }) {
    const isSubCommentLoading = ref(false)
    const userState = useUserState()
    const subComment = ref('')
    const subComments = ref([])

    subComments.value = props.data.subComments
    const isSubCommentVisible = ref(false)
    const handleReply = () => {
      isSubCommentVisible.value = true
    }


    function elapsedTime(date) {
      const start = new Date(date);
      const end = new Date();

      const diff = (end - start) / 1000;

      const times = [
        { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
        { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
        { name: '일', milliSeconds: 60 * 60 * 24 },
        { name: '시간', milliSeconds: 60 * 60 },
        { name: '분', milliSeconds: 60 },
      ];

      for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime > 0) {
          return `${betweenTime}${value.name} 전`;
        }
      }
      return '방금 전';
    }

    const handleCreateSubComment = async () => {
      const body = {
        parentId: props.data._id,
        comment: subComment.value,
        user: userState.user.user._id
      }

      try {
        isSubCommentLoading.value = true
        await axios.post('http://127.0.0.1:3000/api/casualtalks-sub', body)
        isSubCommentVisible.value = false
        subComments.value.push(body)
        subComment.value = ''
      } catch {

      } finally {
        isSubCommentLoading.value = false
      }
    }

    const handleDeleteSubComment = async (data) => {
      console.log('#subComments', data._id)
      console.log(subComments.value)
      const { data: res } = await axios.delete(`http://127.0.0.1:3000/api/casualtalks-sub/${data._id}`)
      console.log(4343343434)
      console.log(res)
      subComments.value = subComments.value.filter(x => x._id !== res._id)
    }

    const handleDeleteComment = async (data) => {
      console.log('#handleDeleteComment')
      console.log(data)
      console.log(data._id)
      const isConfirmed = confirm('Do you want to delete the comment?')
      if (isConfirmed) {
        emit('delete', data._id)
      }
    }

    elapsedTime('2022-11-15');
    return {
      isSubCommentLoading,
      subComment,
      subComments,
      isSubCommentVisible,
      handleReply,
      handleCreateSubComment,
      elapsedTime,
      handleDeleteComment,
      handleDeleteSubComment,
      isSubCommentLoading
    }
  },
};
</script>
<style lang="scss" scoped>
.comment {
  position: relative;
  width: 100%;
  padding: 10px 0px;
  margin-bottom: 20px;
  border-bottom: 2px solid rgb(216, 209, 209);

  &__body {
    // border-left:5px solid rgb(70, 69, 69);
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.pi-reply {
  margin-top: 10px;
  transform: rotateX(180deg);
  color: rgb(168, 157, 157);
}

p {
  margin: 0px;
  padding: 10px 0px;
}

.sub-comment {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 15px;
  padding-left: 10px;
}

.sub-color {
  color: #a09999;
}
</style>