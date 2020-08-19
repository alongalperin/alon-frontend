<template>
  <div class="login-component-container">
    <div class="right-side-container">
      <img class="login-compnay-logo" src="@/assets/green_logo.svg" />
      <div class="middle-wrapper">
        <h1 class="login-welcome-title">היי, טוב לראות אותך</h1>
        <div class="form-container">
          <form class="form" @submit.prevent="onSubmit">
            <!-- Email input -->
            <div class="form-group">
              <div class="input-text-container">
                <input
                  class="input-text"
                  type="text"
                  v-model="email"
                  id="email"
                  name="email"
                  autocomplete="off"
                  placeholder="transparant placeholder"
                />
                <label for="email" class="input-floating-label">
                  <span class="input-floating-content">אימייל:</span>
                </label>
                <br />
              </div>
              <span class="input-remark"
                >כתובת המייל איתה נרשמת לחשבונית ירוקה</span
              >
            </div>

            <!-- Password input -->
            <div class="form-group">
              <div class="input-text-container">
                <input
                  class="input-text"
                  type="password"
                  v-model="password"
                  id="password"
                  name="password"
                  autocomplete="off"
                  placeholder="transparant placeholder"
                />
                <label for="password" class="input-floating-label">
                  <span class="input-floating-content">סיסמא:</span>
                </label>
                <br />
              </div>
              <span class="input-remark"
                ><a href="" v-on:click.self.prevent>שחכת סיסמא?</a></span
              >
            </div>
            <div class="login-buttons-conatiner">
              <input
                class="btn signin-btn"
                :disabled="loading"
                type="submit"
                value="כניסה"
              />
              <div class="btn google-signup-btn">
                כניסה מהירה<img
                  class="google-logo"
                  src="@/assets/Google_G.svg"
                />
              </div>
            </div>
          </form>
          <LoadingComponent v-if="loading" />
          <p>{{ error }}</p>
        </div>
      </div>
      <!-- END form container -->
      <!-- todo: change to one line comment -->
    </div>
    <div class="image-container">
      <img src="@/assets/green_login_page.svg" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponent from "./UI/LoadingComponent";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  components: { LoadingComponent },
  methods: {
    onSubmit: async function() {
      this.loading = true;
      const { email, password } = this;
      this.$store
        .dispatch("HANDLE_LOGIN", {
          email,
          password,
        })
        .then((response) => {
          this.loading = false;
          this.$router.push({ name: "welcome" });
        })
        .catch((err) => {
          // todo: better error handle
          this.loading = false;
          this.error = err;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$image-offset: -8.5%;
$google-btn-color: #0084f4;

.login-component-container {
  display: flex;
  flex-direction: row;
}

.image-container {
  height: 100vh;
  width: 50vw;
  background-color: #ffdcdc;
  position: relative;
}

.image-container img {
  /* todo: change to scss */
  max-height: 80%;
  max-width: 80%;

  position: absolute;
  right: $image-offset;
  top: 50%;
  transform: translateY(-50%);
}

.right-side-container {
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.middle-wrapper {
  width: 50%;
}

.login-welcome-title {
  position: relative;
  right: 1vh;
  letter-spacing: -2px;
}

.form-group {
  margin-bottom: 6vh;
}

.input-remark {
  width: 100%;
}

.form {
  margin-top: 6vh;
  height: auto;
}

.form-button-error {
  display: none !important;
}

.input-text-container {
  position: relative;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

::-webkit-input-placeholder {
  transition: inherit;
  opacity: 0;
}

.input-text-container label {
  /* todo: use scss */
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  pointer-events: none;
  box-sizing: border-box;
  border-bottom: 1px solid black;
}

.input-text-container label::after {
  /* todo: use scss */
  content: "";
  position: absolute;
  left: 0px;
  bottom: -2px;
  height: 100%;
  width: 100%;
  border-bottom: 3px solid #5fa8d3;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.input-text {
  /* todo: use scss */
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 28px;
  border: none;
  position: absolute;
  top: 0px;
  right: 0px;
  outline: none;
  direction: RTL;
}

.input-floating-content {
  position: absolute;
  bottom: 5px;
  right: 2px;
  transition: all 0.3s ease;
}

.input-text:focus + .input-floating-label .input-floating-content,
input:not(:placeholder-shown) + .input-floating-label .input-floating-content {
  /* valid because required is satisfied */
  transform: translateY(-80%);
  font-size: 14px;
  color: #5fa8d3;
}

.input-text:focus + .input-floating-label::after,
input:not(:placeholder-shown) + .input-floating-label::after {
  transform: translateX(0%);
}

/*

.input-text:focus + .input-floating-label .input-floating-content,
.input-text:valid + .input-floating-label .input-floating-content {
  transform: translateY(-80%);
  font-size: 14px;
  color: #5fa8d3;
}

.input-text:focus + .input-floating-label::after,
.input-text:valid + .input-floating-label::after {
  transform: translateX(0%);
}
*/

.login-compnay-logo {
  position: absolute;
  right: 4.5%;
  top: 3.5%;
  width: 221px;
  height: 34px;
}

.login-buttons-conatiner {
  display: flex;
  flex-direction: row;
  place-content: space-between;
}

.btn {
  height: 56px;
  width: 228px;
  border-radius: 100px;
  border: none;
  font-family: "almoni-neue-dl"; /* todo: add fallback font */
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
}

.signin-btn {
  color: #ffffff;
  background: #18c746;
}

.signin-btn:hover {
  background: lighten(#18c746, 3%);
}

.google-signup-btn {
  background: #fff;
  border: 1px solid $google-btn-color;
  color: $google-btn-color;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.google-signup-btn:hover {
  border: 1px solid lighten($google-btn-color, 30%);
}

.google-signup-btn .google-logo {
  /* todo: use scss*/
  height: 24px;
  width: 24px;
  margin-right: 13px;
}

@media only screen and (max-width: 620px) {
  .login-component-container {
    flex-direction: column-reverse;
    height: 100vh;
  }

  .right-side-container {
    width: 95vw;
    align-self: center;
  }

  .image-container {
    display: none;
  }

  .login-compnay-logo {
    right: unset;
  }

  .middle-wrapper {
    width: 80%;
  }

  .form-container {
    width: 80%;
    margin: 0 auto;
  }

  .input-floating-content {
    font-size: 6rem;
  }

  .input-remark {
    font-size: 3rem;
    font-weight: 600;
  }

  .login-buttons-conatiner {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    margin-bottom: 2vh;
  }
}
</style>
