<template>
  <div class="list-card">
    <h2 class="title">{{ title }}</h2>
    <ul class="ul">
      <li class="li">
        <span class="number">
          1
        </span>
        <Avatar image="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_640.png"
          class="flex align-items-center justify-content-center mr-2" size="large" shape="circle" />
        <div class="user-info">
          <span>Eden Canvas</span>
          <span>MW1618</span>
        </div>
        <div>
          <basic-tag v-if="type === 'text'" type="text">3300 점</basic-tag>
          <basic-tag v-else type="status" :isActive="true">
          </basic-tag>
        </div>
      </li>
      <li class="li">
        <span class="number">
          2
        </span>
        <Avatar image="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
          class="flex align-items-center justify-content-center mr-2" size="large" shape="circle" />
        <div class="user-info">
          <span>Eden</span>
          <span>MW1618</span>
        </div>
        <div>
          <basic-tag v-if="type === 'text'" type="text">3000 점</basic-tag>
          <basic-tag v-else type="status" :isActive="true">
          </basic-tag>
        </div>
      </li>
      <li class="li">
        <span class="number">
          3
        </span>
        <Avatar image="https://cdn.pixabay.com/photo/2024/01/12/12/43/male-8503919_640.png"
          class="flex align-items-center justify-content-center mr-2" size="large" shape="circle" />
        <div class="user-info">
          <span>Eden</span>
          <span>MW1618</span>
        </div>
        <div>
          <basic-tag v-if="type === 'text'" type="text">2200 점</basic-tag>
          <basic-tag v-else type="status" :isActive="false">
          </basic-tag>
        </div>
      </li>
      <li class="li">
        <span class="number">
          4
        </span>
        <Avatar image="https://cdn.pixabay.com/photo/2020/06/04/12/55/emoji-5258611_640.png"
          class="flex align-items-center justify-content-center mr-2" size="large" shape="circle" />
        <div class="user-info">
          <span>Eden</span>
          <span>MW1618</span>
        </div>
        <div>
          <basic-tag v-if="type === 'text'" type="text">1000 점</basic-tag>
          <basic-tag v-else type="status" :isActive="false">
          </basic-tag>
        </div>
      </li>
      <li class="li">
        <span class="number">
          5
        </span>
        <Avatar image="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_640.png"
          class="flex align-items-center justify-content-center mr-2" size="large" shape="circle" />
        <div class="user-info">
          <span>Eden</span>
          <span>MW1618</span>
        </div>
        <div>
          <basic-tag v-if="type === 'text'" type="text">0 점</basic-tag>
          <basic-tag v-else type="status" :isActive="false">
          </basic-tag>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import BasicTag from '../tag/BasicTag.vue'
export default {
  components: {
    'basic-tag': BasicTag
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: (props) => ['text', 'status'].includes(props)
    }
  },
  setup() {

  }
}
</script>

<style lang="scss" scoped>
@import '../../../src/assets/styles/mixins.scss';

.list-card {
  display: inline-block;
  min-width: 360px;
  min-height: 300px;
  width: 360px;
  height: auto;
  padding: 30px;
  border-radius: 20px;

  // @include glassmorphism(5px)
  background: #faeee4;
}

.title {
  // padding: 10px;
  padding: 10px;
  // color: red;
  // color: #FE4D26;
  color: #504d4d;
  // @include glassmorphism(1px);
}

h2,
ul,
li {
  margin: 0px;
  padding: 0px;
}

h2 {
  color: #c1bdb6f5;
  font-weight: 600;
  font-size: 20px;
}

.ul {}

.li {
  position: relative;
  margin: 10px 0px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  transition: .3s;
  // @include glassmorphism(1px);
}

.li .number {
  position: absolute;
  top: -5%;
  /* transform: translateY(-50%); */
  left: -15px;
  background: #FE4D26;
  border-radius: 10px;
  padding: 4px 6px;
  color: #fff;
  font-weight: 700;
}

.li:hover {
  transform: perspective(1000px) translateZ(50px);
  background: #fbe596;
  border: none;
}

.li div:last-child {
  /* border:1px solid red; */
  margin-left: auto;
  font-size: 16px;
  font-weight: 700;
  color: #0e0a1e;
}


.li span:last-child {
  /* color: #FBAB5D;
    background: #FBAB5D;
    color:#fff;
    padding:5px;
    border-radius: 6px; */
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
}


.user-info span:first-child {
  font-weight: 500;
  font-size: 18px;
  /* color: #A29FAE;   
    font-size:12px; */
}

.user-info span:last-child {
  color: #A29FAE;
  font-size: 12px;
}
</style>

