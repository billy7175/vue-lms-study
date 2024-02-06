

<script setup>
import { ref } from "vue";
import { loginPost } from "../apis/login";
import { useUserState } from "../stores/user.js";
import { useRouter } from "vue-router";
import VueCookies from "vue-cookies";
const userStore = useUserState();
const router = useRouter();

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

const handleLogin = async () => {
  // TEMP TEST
  try {
    console.log("#router", router);
    await router.push({ name: "main" });
  } catch (error) {
    // 1. invalid signature *토큰 정보가 다른 경우
    // 2. No authorization token was found // token 이 없는 경우
    alert("error test when having no jwt token inside api request");
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
    const { user, token } = data;
    VueCookies.set("token", token);
    VueCookies.set("user", user);
    router.push({ name: "main" });

  } catch (error) {
    const errorData = error.response?.data;
    if (errorData && errorData.code === "IAM001") {
      alert(errorData.message);
    }
  }
};
</script>

<template>
  <div>
    <section>
      <div class="box">
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>
        <div class="square"></div>

        <div class="container-login">
          <div class="form">
            <h2>LOGIN</h2>
            <div action="">
              <div class="input-wrapper">
                <input class="input-control useremail" v-model="userEmail" type="text" required="required"
                  placeholder="Email" />
                <!-- <span>Login</span> -->
              </div>
              <div class="input-wrapper password">
                <input class="input-control password" v-model="userPassword" id="password-input" type="password"
                  name="password" required="required" placeholder="Password" />
                <i class="fas fa-key"></i>
              </div>
              <div class="input-wrapper">
                <button @click="login">Login(POST)</button>
              </div>
            </div>
            <p>Forgot password? <a href="#">Click Here</a></p>
            <p>Don't have an account <a href="#">Sign up</a></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #426d98;
}

.box {
  position: relative;

  .square {
    position: absolute;
    background: rgba(219, 207, 207, 0.1);
    backdrop-filter: blur(8px);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    animation: square 10s linear infinite;
  }

  .square:nth-child(2) {
    animation: square-rotate 5s linear infinite;
  }

  .square:nth-child(4) {
    animation: square-rotate02 10s linear infinite;
  }

  // @keyframes square {
  //   0%,
  //   100% {
  //     transform: translateY(-50px);
  //   }

  //   50% {
  //     transform: translateY(20px);
  //   }
  // }

  // @keyframes square-rotate {
  //   0%,
  //   100% {
  //     transform: translateY(-50px) rotate(0deg);
  //   }

  //   50% {
  //     transform: translateY(20px) rotate(90deg);
  //   }
  // }

  // @keyframes square-rotate02 {
  //   0%,
  //   100% {
  //     transform: translateY(-50px) rotate(0deg);
  //   }

  //   50% {
  //     transform: translateY(220px) rotateY(45deg) rotateX(270deg);
  //   }
  // }


  .square:nth-child(1) {
    width: 120px;
    height: 120px;
    top: -25px;
    right: -40px;
  }

  .square:nth-child(2) {
    width: 160px;
    height: 160px;
    top: 65px;
    left: -130px;
    z-index: 2;
  }


  .square:nth-child(3) {
    width: 100px;
    height: 100px;
    bottom: -20px;
    left: -65px;
  }


  .square:nth-child(4) {
    width: 85px;
    height: 85px;
    bottom: 25px;
    right: -50px;
    z-index: 2;
  }
}

.container-login {
  position: relative;
  padding: 50px;
  width: 300px;
  box-sizing: content-box;
  min-height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
}

.form {
  position: relative;
  width: 100%;
  height: 100%;

  h2 {
    color: #fff;
    letter-spacing: 2px;
    margin-bottom: 30px;
  }

  .input-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: 20px;

    .input-control {
      width: 100%;
      outline: none;
      border: none;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.2);
      padding: 12px 16px;
      border-radius: 15px;
      color: #fff;
      font-size: 16px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    }

    input::placeholder {
      color: #fff;
    }
  }

  p {
    color: #fff;
    font-size: 15px;
    margin-top: 5px;

    a {
      color: #fff;
    }
  }
}
</style>