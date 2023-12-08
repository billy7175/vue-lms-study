

<script setup>
import { getTest, loginPost } from "../apis/login";

const handleLogin = () => {
  getTest();
};

const handleLoginPost = async () => {
  try {
    const res = await loginPost();
    console.log("#res", res);
  } catch (error) {
    const errorData = error.response?.data
    if(errorData && errorData.code === 'IAM001'){
      alert(errorData.message)
    }
  }
};
</script>

<template>
  <div class="login-page">
    <div class="form">
      <div class="register-form">
        <input type="text" placeholder="Name" />
        <input type="password" placeholder="Password" />
        <input type="email" placeholder="Email" />
        <button>Create</button>
        <p class="message">Already registered? <a href="#">Sign In</a></p>
      </div>
      <div class="login-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button @click="handleLoginPost">Login(POST)</button>
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