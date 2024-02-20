<template>
  <div class="comment">
    <div class="comment__inner" @mouseover="isHovering = true" @mouseout="handleMouseOut"
      :class="{ 'test-animation': isHovering }">
      <section class="comment__body">
        <div class="comment__row">
          <Avatar image="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_640.png"
            class="flex align-items-center justify-content-center mr-2" size="small" shape="circle" />
          <span>{{ data.user.name }} </span>
          <span class="sub-color">{{ elapsedTime(data.createdAt) }}</span>
          <div style="
            display: flex;
            align-items: center;
            margin-left: auto;
            color: #a09999;
          ">
            <i @click="handleDeleteComment(data)" class="pi pi-trash"></i>
          </div>
        </div>
        <div>
          <Textarea class="comment-textarea" autoResize v-model="data.comment" disabled />
        </div>
        <div style="display: flex; gap: 10px; justify-items: center; padding:10px 0px;">
          <i v-if="isLiked" @click="isLiked = !isLiked" style="color: red" class="pi pi-heart-fill"></i>
          <i v-else @click="isLiked = !isLiked" style="color: red" class="pi pi-heart"></i>
          <i v-if="isBookmarked" @click="isBookmarked = !isBookmarked" class="pi pi-bookmark-fill"></i>
          <i v-else @click="isBookmarked = !isBookmarked" class="pi pi-bookmark"></i>
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
              <Avatar image="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_640.png"
                class="flex align-items-center justify-content-center mr-2" size="small" shape="circle" />
              <span>{{ sub.user.name }}</span>
              <!-- <pre>
              {{ sub }}
            </pre> -->
              <span class="sub-color">{{ elapsedTime(sub.createdAt) }}</span>
              <div style="
                display: flex;
                align-items: center;
                margin-left: auto;
                color: #a09999;
              ">
                <i @click="handleDeleteSubComment(sub)" class="pi pi-trash"></i>
              </div>
            </div>
            <div>
              <p class="sub-comment-field">
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
  </div>
</template>


<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useUserState } from '../../stores/user'
import { MessageBox } from 'billy-ui'
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
    const isLiked = ref(false)
    const isBookmarked = ref(false)
    const isHovering = ref(false)

    subComments.value = props.data.subComments
    const isSubCommentVisible = ref(false)
    const handleReply = () => {
      isSubCommentVisible.value = true
      alert(isSubCommentVisible.value)
    }


    const handleClickOutside = (event) => {
      console.log('#handleClickOutside event', event)
      console.log('#handleClickOutside event', event.srcElement)
      const el = event.srcElement

      document.querySelector('body').addEventListener('click', e => {
        if (el.contains(e.target)) {
          console.log('clicked inside')
          return
        } else {
          console.log('clicked outside')
          isSubCommentVisible.value = false
        }
      })
    };

    onMounted(() => {
      // Attach the event listener when the component is mounted
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      // Remove the event listener when the component is unmounted
      document.removeEventListener('click', handleClickOutside);
    });

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
      isSubCommentLoading.value = true
      emit('create-sub-comment', {
        parentId: props.data._id,
        comment: subComment.value,
        user: userState.user.user._id
      })

      isSubCommentVisible.value = false
      isSubCommentLoading.value = false
      subComment.value = ''
    }

    const handleDeleteSubComment = async (data) => {
      MessageBox.confirm('삭제하시겠습니까?').then(() => {
        emit('delete-sub-comment', data)
      }).catch(() => {
        console.log('cancel')
      })
    }

    const handleDeleteComment = async (data) => {
      const isConfirmed = await MessageBox.confirm('삭제하시겠습니까?')
      console.log('#isConfirmed', isConfirmed)

      if (isConfirmed) {
        emit('delete', data._id)
      }
    }


    const handleMouseOut = () => {
      isHovering.value = false
    }

    watch(() => props.data.subComments, (newVal, oldVal) => {
      subComments.value = newVal
    })

    elapsedTime('2022-11-15');
    return {
      isLiked,
      isBookmarked,
      isSubCommentLoading,
      subComment,
      subComments,
      isSubCommentVisible,
      handleReply,
      handleCreateSubComment,
      elapsedTime,
      handleDeleteComment,
      handleDeleteSubComment,
      isSubCommentLoading,
      handleMouseOut,
      isHovering
    }
  },
};
</script>
<style lang="scss" scoped>
.comment {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  margin: 20px 0px;
  transform-style: preserve-3d;
  perspective-origin: center;
  perspective: 500px;

  &__inner {
    border-radius: 10px;
    padding: 20px;
    background: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transition: 1s;

    // &:hover {
    //   transform: rotateX(-3deg) rotateY(0deg) translateZ(20px);
    // }
  }

  ::v-deep(.comment-textarea) {
    width: 100%;
    margin: 10px 0px;
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    color: #000;
    // border: 1px solid rgb(179, 169, 169);
    padding: 20px 20px;
    background: #faf7f7;
    border: none;
  }

  &__body {
    // border-left:5px solid rgb(70, 69, 69);
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.sub-comment-field {
  background: #faf7f7;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0px;
  color: #000;
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


.test-animation {
  animation: moveObject 3s infinite linear normal;
}


@keyframes moveObject {

  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }

  25% {
    transform: rotateX(-1deg) rotateY(-1deg) rotateZ(0deg);
  }

  50% {
    transform: rotateX(1deg) rotateY(1deg) rotateZ(0deg);
  }

  // 50% {
  //   transform: rotateX(-4deg) rotateY(-2deg) rotateZ(0deg);
  // }

  100% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }

  // from {
  //   transform: rotateX(360deg) rotateY(0deg) rotateZ(0deg);
  // }

  // to {
  //   transform: rotateX(0deg) rotateY(360deg) rotateZ(360deg);
  // }
}
</style>