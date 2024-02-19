<template>
  <div class="comment-box">
    <h2 class="title">Casual Talk</h2>
    <section>
      <div class="input-wrapper" style="position: relative">
        <textarea v-model="comment" class="input-field" placeholder="Write comment"></textarea>
        <i @click="handleCreate" class="pi pi-send"></i>
      </div>
      <div v-if="commentList && commentList.length">
        <div v-if="isCommentLoading" style="display:flex; justify-content: center;">
          <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        </div>
        <div v-for="(comment, idx) in commentList" :key="idx">
          <comment :data="comment" @create-sub-comment="handleCreateSubComment"
            @delete-sub-comment="handleDeleteSubComment" @reload="fetchComments" @delete="onDelete">
          </comment>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import Comment from './Comment.vue'
import axios from 'axios'
import { useUserState } from '../../stores/user'
export default {
  components: {
    Comment
  },
  setup(props, { emit }) {
    const userState = useUserState();
    const page = ref(0)

    const onDelete = async (id = 'test id') => {
      try {
        const { data } = await axios.delete(`http://127.0.0.1:3000/api/casualtalks/${id}`);
        commentList.value = commentList.value.filter(x => x._id !== id)
      } catch (error) {
        console.log(error)
      }

    }
    const fetchComments = async (isFirstCall = true) => {
      try {
        page.value += 1
        const body = {
          page: page.value
        }
        console.log('#body', body)
        const { data } = await axios.get(`http://127.0.0.1:3000/api/casualtalks?page=${page.value}`, body);
        commentList.value = [...commentList.value, ...data];

      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      const mainInnerElement = document.querySelector('.main__inner');
      const scrollThreshold = 0.8; // Adjust the threshold as needed
      let isScrolled = false;

      const handleScroll = () => {
        const scrollPosition = mainInnerElement.scrollTop;
        const isScrollingDown = scrollPosition > (mainInnerElement._lastScrollTop || 0);

        if (isScrollingDown && !isScrolled && scrollPosition / (mainInnerElement.scrollHeight - mainInnerElement.clientHeight) > scrollThreshold) {
          fetchComments()
          console.log('Reached the bottom of the scrollable element');
          // Fetch more data or perform any action
          // fetchMoreData();

          // Set the flag to true to indicate that the function has been executed
          isScrolled = true;
        } else if (!isScrollingDown) {
          // Reset the flag when scrolling up
          isScrolled = false;
        }

        // Store the last scroll position
        mainInnerElement._lastScrollTop = scrollPosition;
      };

      if (mainInnerElement) {
        mainInnerElement.addEventListener('scroll', handleScroll);
      }

      // Cleanup the event listener when the component is unmounted
      onUnmounted(() => {
        console.log('#onUnmounted')
        if (mainInnerElement) {
          mainInnerElement.removeEventListener('scroll', handleScroll);
        }
      });

      // Fetch initial data
      fetchComments();
    });
    // import { onMounted, onUnmounted, ref } from 'vue';

    // onMounted(async () => {
    //   const mainInnerElement = document.querySelector('.main__inner');
    //   const scrollThreshold = 0.8; // Adjust the threshold as needed
    //   let isFetchingData = false;

    //   if (mainInnerElement) {
    //     const handleScroll = () => {
    //       const scrollPosition = mainInnerElement.scrollTop / (mainInnerElement.scrollHeight - mainInnerElement.clientHeight);

    //       if (scrollPosition > scrollThreshold && !isFetchingData) {
    //         console.log('Reached the bottom of the scrollable element');
    //         isFetchingData = true;
    //         // Fetch more data or perform any action
    //         // fetchMoreData();

    //         // Cleanup the event listener after fetching data
    //         mainInnerElement.removeEventListener('scroll', handleScroll);
    //       }
    //     };

    //     mainInnerElement.addEventListener('scroll', handleScroll);

    //     // Cleanup the event listener when the component is unmounted
    //     onUnmounted(() => {
    //       mainInnerElement.removeEventListener('scroll', handleScroll);
    //     });
    //   }

    //   // Fetch initial data
    //   fetchComments();
    // });

    const comment = ref('')
    const isCommentLoading = ref(false)
    const commentList = ref([])

    const handleCreate = async (event) => {
      try {
        isCommentLoading.value = true
        emit('create', comment.value)
        const userId = userState.user.user._id
        const body = {
          user: userId,
          comment: comment.value
        }

        setTimeout(async () => {
          const { data } = await axios.post('http://127.0.0.1:3000/api/casualtalks', body);
          commentList.value.unshift(data)
          comment.value = ''
        }, 900)

      } catch (error) {
        console.log(error)
      } finally {
        console.log('#finally')
        setTimeout(() => {
          isCommentLoading.value = false
        }, 1000)
      }
    };

    const handleCreateSubComment = async (body) => {
      console.log('#handleCreateSubComment', body)
      const { data } = await axios.post('http://127.0.0.1:3000/api/casualtalks-sub', body)
      console.log('#data', data)
      commentList.value.forEach(x => x._id === body.parentId ? x.subComments.push(data) : x)

      console.log('#commentList', commentList.value)
    }


    const handleDeleteSubComment = async (data) => {
      console.log('#handleCreateSubComment', data)
      console.log('#commentList', commentList.value)
      const { data: res } = await axios.delete(`http://127.0.0.1:3000/api/casualtalks-sub/${data._id}`)
      // console.log('Delete item,', res)
      // commentList.value = commentList.value.map(x => x._id === data.parentId ? x.subComments = x.subComments.filter(x => x._id !== data._id) : x)


      // const commentList = ref([]);

      commentList.value = commentList.value.map((item) => {
        if (item._id === data.parentId) {

          item.subComments = item.subComments.filter((subItem) => subItem._id !== res._id);
        }

        return item;
      });

      console.log('#commentList', commentList.value)
    }

    return {
      onDelete,
      isCommentLoading,
      fetchComments,
      handleCreate,
      comment,
      commentList: commentList,
      handleCreateSubComment,
      handleDeleteSubComment
    }
  }
}
</script>

<style scoped>
.comment-box {
  border-radius: 10px;
  width: 800px;
  color: #fff;
  color: #191818;
  padding: 20px;
  overflow-y: auto;
  background: #fafaf6;
  /* background: red; */
  /* background: #faf7f7; */
  border-radius: 10px;

}

.title {
  padding: 0px;
  margin: 0px;
  margin-bottom: 5px;
  color: #a09898;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 0px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.pi-send {
  font-size: 20px;
  margin: 10px;
}

.pi-send:hover {
  color: #999;
  color: #6ca055;
}

.pi-send:active {
  color: red;
}

textarea:focus {
  outline: none;
}

.input-field {
  width: 100%;

  color: #8d8989;
  border-radius: 10px;
  font-weight: 700;
  color: #000;
  border: none;
  background: none;
}
</style>