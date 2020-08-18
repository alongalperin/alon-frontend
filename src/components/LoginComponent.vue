<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <label for="email">Email:</label><br />
      <input type="text" v-model="email" id="email" name="email" /><br />
      <label for="password">Password:</label><br />
      <input type="text" v-model="password" id="password" name="password" />
      <input type="submit" value="Submit" />
    </form>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  components: {},
  methods: {
    onSubmit: async function() {
      const { email, password } = this;
      this.$store
        .dispatch("HANDLE_LOGIN", {
          email,
          password,
        })
        .then((response) => {
          this.$router.push({ name: "welcome" });
        })
        .catch((err) => {
          // todo: better error handle
          this.error = err;
        });
    },
  },
};
</script>

<style></style>
