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
    <p>{{ this.error }}</p>
    {{ $store.getters.isAuthenticated }}
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
      let response;

      try {
        response = await axios.post(
          "https://sandbox.d.greeninvoice.co.il/api/v1/account/login",
          {
            email: this.email,
            password: this.password,
          }
        );
      } catch (err) {
        this.error = "somwthing went wrong";
        return;
      }
      const jwtToken = response.headers["x-authorization-bearer"];
      localStorage.setItem("user-token", jwtToken);
      axios.defaults.headers.common["Authorization"] = jwtToken;
      this.$store.dispatch("SET_USER_TOKEN", jwtToken);
    },
  },
};
</script>

<style></style>
