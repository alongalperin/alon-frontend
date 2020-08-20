<template>
  <div class="welcome-component-container">
    <LoadingComponent v-if="loading" />
    <div class="main-container" v-if="!loading">
      <h1>שלום {{ firstname }}, ברוכים הבאים לעסק שלכם {{ businessName }}</h1>
      <button class="logout-btn" @click="logout">להתנתק</button>
      <img src="https://media.giphy.com/media/3o7aTskHEUdgCQAXde/giphy.gif" />
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
    logout: function () {
      if (confirm("Are you sure you want to logout?")) {
        this.$store.dispatch("LOGOUT").then(() => {
          this.$router.push("/login");
        });
      }
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
    firstname: function () {
      return this.$store.getters.firstname;
    },
  },
};
</script>

<style scoped>
.welcome-component-container {
  width: 70vw;
  margin: 0 auto;
}

h1 {
  direction: rtl;
  text-align: center;
}

img {
  display: block;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logout-btn {
  height: 56px;
  width: 228px;
  border-radius: 5px;
  background: none;
  margin: 10px;
  margin-bottom: 40px;
  border: 2px solid #dc3545;
  font-family: "almoni-neue-dl"; /* todo: add fallback font */
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.4s ease;
}

.logout-btn:hover {
  color: #fff;
  background: #dc3545;
}
</style>
