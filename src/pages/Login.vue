

<script setup>
import { ref } from "vue";
import { getTest, loginPost } from "../apis/login";
// import { defineComponent } from "vue";
import ToggleButton from "primevue/togglebutton";

import { useUserState } from "../stores/user.js";
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'
const userStore = useUserState();
const router = useRouter()

// const { isLoggedIn, test } = mapState(userStore, ["isLoggedIn", "test"]);
// console.log("1#isLoggedIn", isLoggedIn);
// console.log("1#test", test);

const slideValue = ref(79);
const checked = ref(false);
const userEmail = ref("");
const userPassword = ref("");

const login = () => {
  const isValid = validateForms();
  if (!isValid) return;
  handleLoginPost();
};

const validateForms = () => {
  if (!userEmail.value) {
    alert("Enter Email.");
    return false;
  }

  if (!userPassword.value) {
    alert("Enter Password.");
    return false;
  }

  return true;
};

const handleLogin = async () => { // TEMP TEST
  try {
    console.log('#handleLogin')
    await getTest();
    console.log('#router', router)
    await router.push({ name : 'main'})
  } catch(error){
    // 1. invalid signature *토큰 정보가 다른 경우
    // 2. No authorization token was found // token 이 없는 경우
    alert('error test when having no jwt token inside api request')
  }
};

const handleLoginPost = async () => {
  try {
    const params = {
      email: userEmail.value,
      password: userPassword.value,
    };

    const { data } = await loginPost(params);
    console.log("#res", data);
    userStore.loginUser(data);
    const { user , token} = data
    VueCookies.set('token', token)
    VueCookies.set('user', user)
    location.reload()
    
  } catch (error) {
    const errorData = error.response?.data;
    if (errorData && errorData.code === "IAM001") {
      alert(errorData.message);
    }
  }
};

// export default defineComponent({
//   name: "Login",
//   components: {
//     Button
//   },
// });
</script>

<template>
  <div class="login-page">
    <pre style="width: 100px">
      {{ userStore.user }}
    </pre>
    <div class="form">
      <h1>
        <ToggleButton v-model="checked" />

        {{slideValue}}
        <Slider v-model="slideValue" />
      </h1>
      <div class="register-form">
        <input type="text" placeholder="Name" />
        <input type="password" placeholder="Password" />
        <input type="email" placeholder="Email" />
        <button>Create</button>
        <p class="message">Already registered? <a href="#">Sign In</a></p>
      </div>
      <div class="login-form">
        <input v-model="userEmail" type="email" placeholder="Email" />
        <input v-model="userPassword" type="password" placeholder="Password" />
        <button @click="login">Login(POST)</button>
        <button @click="handleLogin">Login</button>
        <p class="message">Not registered? <a href="#">Create an Account</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  padding: 10% 0 0;
  margin: auto;
}

.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 400px;
  margin: 0 auto 100px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1), 0 5px 5px 0 rgba(0, 0, 0, 0.2);
}
.form input {
  outline: 0;
  background: var(--input-bgcolor);
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 1rem;
  font-size: 0.9rem;
}
.form button {
  text-transform: uppercase;
  outline: 0;
  background: var(--fourth-color);
  background: #113f67;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 1rem;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: var(--third-color);
}
.form .message {
  margin: 15px 0 0;
  color: var(--second-color);
  font-size: 0.8rem;
}
.form .message a {
  color: var(--third-color);
  text-decoration: none;
}
.form .register-form {
  display: none;
}
</style>