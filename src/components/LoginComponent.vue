<template>
  <div class="login-component-container">
    <div class="right-side-container">
      <img class="login-compnay-logo" src="@/assets/green_logo.svg" />
      <div class="middle-right-side-wrapper">
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
              <span class="input-remark">כתובת המייל איתה נרשמת לחשבונית ירוקה</span>
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
              <span class="input-remark">
                <a href v-on:click.self.prevent>שחכת סיסמא?</a>
              </span>
            </div>
            <div class="login-buttons-conatiner">
              <input class="btn signin-btn" :disabled="loading" type="submit" value="כניסה" />
              <div class="btn google-signup-btn">
                כניסה מהירה
                <img class="google-logo" src="@/assets/Google_G.svg" />
              </div>
            </div>
          </form>
          <LoadingComponent v-if="loading" />
          <p class="error-p">{{ error }}</p>
        </div>
        <p class="join-message-p">
          עוד לא הצטרפת?
          <a href v-on:click.self.prevent>ל-30 יום ניסיון</a>
        </p>
      </div>
    </div>
    <div class="image-container">
      <img src="@/assets/green_login_page.svg" />
    </div>
  </div>
</template>

<script>
import LoadingComponent from "./UI/LoadingComponent";
import { HANDLE_LOGIN } from "../store/constants";

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
    onSubmit: async function () {
      this.error = "";
      const { email, password } = this;
      if (email.trim() === "" || password.trim() === "") {
        this.error = "מייל או סימסא חסרים";
        return;
      }
      this.loading = true;
      this.$store
        .dispatch(HANDLE_LOGIN, {
          email,
          password,
        })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "welcome" });
        })
        .catch((err) => {
          this.loading = false;
          this.error = err;
        });
    },
  },
};
</script>

<style lang="scss" scoped src="../style/floatingInputFieldPlaceholder.scss" />
<style lang="scss" scoped>
a:visited {
  color: unset;
}

::-webkit-input-placeholder {
  transition: inherit;
  opacity: 0;
}

.login-component-container {
  display: flex;
  flex-direction: row;
  color: $dark-blue-color;

  @media only screen and ($media-query-mobile-screen) {
    flex-direction: column-reverse;
    height: 100vh;
  }
}

.right-side-container {
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and ($media-query-mobile-screen) {
    width: 95vw;
    align-self: center;
  }
}

.image-container {
  height: 100vh;
  width: 50vw;
  background-color: #ffdcdc;
  position: relative;

  & img {
    max-height: 80%;
    max-width: 80%;

    position: absolute;
    right: $image-offset;
    top: 50%;
    transform: translateY(-50%);
  }

  @media only screen and ($media-query-mobile-screen) {
    display: none;
  }
}

.middle-right-side-wrapper {
  width: 50%;

  @media only screen and ($media-query-mobile-screen) {
    width: 80%;
  }
}

.login-welcome-title {
  position: relative;
  right: 1vw;
  letter-spacing: -2px;

  @media only screen and ($media-query-mobile-screen) {
    top: 8vh;
    right: 3vw;
  }
}

.form-container {
  @media only screen and ($media-query-mobile-screen) {
    width: 80%;
    margin: 0 auto;
  }
}

.form {
  margin-top: 6vh;
  height: auto;
}

.form-group {
  margin-bottom: 6vh;

  .input-remark {
    width: 100%;

    @media only screen and ($media-query-mobile-screen) {
      font-weight: 600;
    }
  }
}

.login-compnay-logo {
  position: absolute;
  right: 4.5%;
  top: 3.5%;
  width: 221px;
  height: 34px;

  @media only screen and ($media-query-mobile-screen) {
    right: unset;
  }
}

.login-buttons-conatiner {
  display: flex;
  flex-direction: row;
  place-content: space-between;

  @media only screen and ($media-query-mobile-screen) {
    flex-direction: column;
    align-items: center;
  }
}

.btn {
  height: 56px;
  width: 228px;
  border-radius: 100px;
  border: none;
  font-family: "almoni-neue-dl", Times, serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;

  @media only screen and ($media-query-mobile-screen) {
    margin-bottom: 2vh;
  }

  &.signin-btn {
    color: #ffffff;
    background: $lime-green-color;
  }

  &.signin-btn:hover {
    background: lighten($lime-green-color, 3%);
  }

  &.google-signup-btn {
    background: #fff;
    border: 1px solid $google-btn-color;
    color: $google-btn-color;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  &.google-signup-btn > .google-logo {
    height: 24px;
    width: 24px;
    margin-right: 13px;
  }

  &.google-signup-btn:hover {
    border: 1px solid lighten($google-btn-color, 30%);
  }
}

.join-message-p {
  font-size: 1.2rem;
  color: $google-btn-color;
}

.error-p {
  color: $danger-color;
  font-weight: 400;

  @media only screen and ($media-query-mobile-screen) {
    font-size: 1.2rem;
    margin-top: 0px;
  }
}
</style>
