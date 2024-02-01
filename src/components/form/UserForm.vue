<template>
  <div class="form">
    <div class="form__inner">
      <div class="input-wrapper center">
        <Avatar image="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_640.png"
          class="flex align-items-center justify-content-center mr-2" size="large" shape="circle"
          style="width:150px; height:150px;" />
        <div style="padding:10px;">
          <h3 class="avatar-title">
            Vikas Assudani
          </h3>
          <p class="avatar-subtitle">UI/UX Designer</p>
          <div class="follow-card">
            <div>
              <span>Following</span>
              <span>12명</span>
            </div>
            <div>
              <span>Followers</span>
              <span>15명</span>
            </div>
          </div>
        </div>

      </div>

      <div v-if="user && user._id" class="input-wrapper">
        <label class="input-label" for="userId">_id</label>
        <InputText id="userId" class="inputtext" placeholder="Password" v-model="user._id" disabled />
      </div>

      <div v-if="user && user.name" class="input-wrapper">
        <label class="input-label" for="userName">Name</label>
        <InputText id="userName" class="inputtext" placeholder="Username" v-model="user.name" />
      </div>

      <div class="input-wrapper">
        <label class="input-label" for="userNickname">Nickname</label>
        <InputText id="userNickname" class="inputtext" placeholder="Nickname" />
      </div>

      <div class="input-wrapper">
        <label class="input-label" for="userClass">Class</label>
        <InputText id="userClass" class="inputtext" placeholder="MW1719" />
      </div>
      <div v-if="user && user.email" class="input-wrapper">
        <label class="input-label" for="userEmail">Email</label>
        <InputText id="userEmail" class="inputtext" placeholder="Email" v-model="user.email" />
      </div>

      <div v-if="user && user.password" class="input-wrapper">
        <label class="input-label" for="userPassword">Password</label>
        <InputText id="userPassword" type="password" class="inputtext" placeholder="Password" v-model="user.password"
          disabled />
      </div>


      <div v-if="user && user.role" class="input-wrapper">
        <label class="input-label" for="userRole">Role</label>
        <InputText id="userRole" class="inputtext" placeholder="Password" v-model="user.role" disabled />
      </div>
    </div>



  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    title: {
      type: String,
      default: 'title'
    }
  },
  setup(props) {
    console.log('#form', props.data)
    const user = reactive(props.data)
    return {
      user: user.value
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 800px;
  width: 50%;
  position: relative;
  border: 1px solid #9259F0;
  background: #fff;
  border-radius: 30px;
  overflow: hidden;
  overflow-y: scroll;
  height: 720px;

  &__inner {
    background: #fff;
    padding: 30px;
    margin: 10px;
    margin-top: 0px;
    border-radius: 20px;
  }

  &__title {
    text-indent: 30px;
    color: #000;
    font-weight: 700;
  }

}


.input-label {
  color: #616161;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 10px;
  padding-left: 5px;
}

.input-wrapper {
  margin-bottom: 20px;

  &.center {
    display: flex;
    align-items: center;
    // flex-direction: column;
  }
}

.avatar-title {
  font-size: 20px;
  color: #935AF0;
  margin: 0px;
  // text-align: center;
}

.avatar-subtitle {
  margin: 0px;
  // text-align: center;
}

.inputtext {
  width: 100%;
  box-sizing: border-box;
}

.follow-card {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
</style>