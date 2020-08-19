<template>
  <div>
    <LoadingComponent v-if="loading" />
    <div v-if="!loading">
      <h1>שלום {{ firstname }}, ברוכים הבאים לעסק שלכם {{ businessName }}</h1>
      <button @click="logout">להתנתק</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponent from "./UI/LoadingComponent";

export default {
  name: "Welcome",
  data() {
    return {
      businessName: "",
      loading: true,
    };
  },
  components: {
    LoadingComponent,
  },
  methods: {
    logout: function() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/login");
      });
    },
  },
  async mounted() {
    try {
      const response = await axios.get(
        "https://sandbox.d.greeninvoice.co.il/api/v1/businesses/me"
      );
      this.businessName = response.data.name;
      this.loading = false;
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    firstname: function() {
      return this.$store.getters.firstname;
    },
  },
};
</script>

<style>
h1 {
  direction: rtl;
}
</style>
