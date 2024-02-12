<template>
  <div class="comment-box">
    <h2 class="title">Casual Talk</h2>
    <section>
      <div class="input-wrapper" style="position: relative">
        <textarea
          v-model="comment"
          class="input-field"
          placeholder="Write comment"
        ></textarea>
        <i @click="handleCreate" class="pi pi-send"></i>
      </div>
      <div v-if="commentList && commentList.length">
        <div v-for="(comment, idx) in commentList" :key="idx">
          <comment :data="comment"></comment>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import Comment from './Comment.vue'
export default {
  components: {
    Comment
  },
  setup(props, { emit }){
    const comment = ref('')
    const commentList = ref([
      {   
          name:'Alexander Koghuashvili',
          imageUrl: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png",
          createdDate: new Date(),
          comment: 'Wonderful work and create presentation. I\'ll be very happy if you also see my projects.',
          subComments : [
            {
              name: 'Thomas Shelby',
              imageUrl: 'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_640.png',
              createdDate: new Date(),
              comment: 'I don\'t think, that is the problem!'
            }
          ]
        },
        { 
          name:'Thomas Shelby',
          imageUrl: "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png",
          createdDate: new Date(),
          comment: 'There is time, when my emotioanal minds conflict each other.',
          subComments : [
            {
              name: 'Thomas Shelby',
              imageUrl :'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_640.png',
              createdDate: new Date(),
              comment: 'Serously, what are you talking about ????'
            },
            {
              name: 'Sherlock Homles',
              createdDate: new Date(),
              comment: 'what are you guys fighting for ?? lol'
            },
            {
              name: 'Nobody',
              imageUrl: 'https://cdn.pixabay.com/photo/2020/06/04/12/55/emoji-5258611_640.png',
              createdDate: new Date(),
              comment: 'just let them fight lololololololololololololololololololololololol'
            }
          ]
        }
      ])

    const handleCreate = (event) => {
      console.log('#value',  comment.value)
      emit('create', comment.value)
      const newCommnet = {
        name:'Test User',
        comment: comment.value,
        createdDate: new Date(),

      }
      commentList.value.unshift(newCommnet)


    }

    return {
      handleCreate,
      comment,
      commentList : commentList
    }
  }
}
</script>

<style scoped>
.comment-box {
  border-radius: 10px;
  width: 500px;
  color: #fff;
  background: #000;
  background: #fff;
  color: #191818;
  padding: 20px;
  border: 5px solid rgb(226, 221, 226);
}

.title {
  padding: 0px;
  margin: 0px;
  margin-bottom: 5px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid rgb(192, 188, 188);
  border-radius: 10px;
  padding: 5px;
  margin: 10px 0px;
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
  background: #191818;
  border: none;
  color: #8d8989;
  border-radius: 10px;
  font-weight: 700;
  background: none;
  color: #000;
}
</style>