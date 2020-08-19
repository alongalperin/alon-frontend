<template>
  <div class="login-component-container">
    <div class="right-side-container">
      <img class="login-compnay-logo" src="@/assets/green_logo.svg" />
      <div class="form-container">
        <h1>היי, טוב לראות אותך</h1>
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
                required
              />
              <label for="email" class="input-floating-label">
                <span class="input-floating-content">אימייל:</span>
              </label>
              <br />
            </div>
            <span>כתובת המייל איתה נרשמת לחשבונית ירוקה</span>
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
                required
              />
              <label for="password" class="input-floating-label">
                <span class="input-floating-content">סיסמא:</span>
              </label>
              <br />
            </div>
            <span><a href="" v-on:click.self.prevent>שחכת סיסמא?</a></span>
          </div>
          <div>
            <input :disabled="loading" type="submit" value="Submit" />
            <button>Google</button>
          </div>
        </form>
        <LoadingComponent v-if="loading" />
        <p>{{ error }}</p>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-container {
  width: 70%;
  height: 60vh;
}

.form-group {
  margin-bottom: 6vh;
}

.form {
  margin-top: 6vh;
  height: auto;
}

.form-container h1 {
  /* todo: use scss */
  font-size: 4rem; /* todo: work with rem */
}

.input-text-container {
  position: relative;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
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
.input-text:valid + .input-floating-label .input-floating-content {
  /* valid because required is satisfied */
  transform: translateY(-80%);
  font-size: 14px;
  color: #5fa8d3;
}

.input-text:focus + .input-floating-label::after,
.input-text:valid + .input-floating-label::after {
  transform: translateX(0%);
}

.login-compnay-logo {
  position: absolute;
  right: 4.5%;
  top: 3.5%;
  width: 221px;
  height: 34px;
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
    left: 50%;
    transform: translate(-50%);
  }

  .form-container {
    width: 100%;
    height: 80vh;
  }
}
</style>
