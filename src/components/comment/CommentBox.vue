<template>
  <div class="comment-box">
    <h2 class="title">Casual Talk</h2>
    <section>
      <div>
        <textarea class="input-field" placeholder="Write comment"></textarea>
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
import Comment from './Comment.vue'
export default {
  components: {
    Comment
  },
  setup(){
    return {
      commentList : [
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
      ]
    }
  }
}
</script>

<style scoped>
.comment-box {
  border-radius: 10px;
  width: 500px;
  color: #fff;
  background:#000;
  background:#fff;
  color:#191818;
  padding: 20px;
  border:5px solid rgb(226, 221, 226);
}

.title {
  padding: 0px;
  margin: 0px;
  margin-bottom:5px;
}

.input-field {
  width: 100%;
  background: #191818;
  color: #8d8989;
  padding: 20px;
  margin: 0px;
  border-radius: 10px;
  font-weight: 700;
  border:1px solid #b4adad56;
  margin:20px 0px;
  background: none;
  color:#000;
}
</style>