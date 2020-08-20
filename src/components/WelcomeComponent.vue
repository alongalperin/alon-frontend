<template>
  <div class="welcome-component-container">
    <div style="text-align: center">
      <LoadingComponent v-if="loading" />
    </div>
    <div class="main-container" v-if="!loading">
      <p>{{ error }}</p>
      <h1>שלום {{ firstName }}, ברוכים הבאים לעסק שלכם {{ businessName }}</h1>
      <button class="logout-btn" @click="logout">להתנתק</button>
      <img src="https://media.giphy.com/media/1rL6xIyaPjgks0zQ4X/giphy.gif" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoadingComponent from "./UI/LoadingComponent";
import { LOGOUT } from "../store/constants";

export default {
  name: "Welcome",
  data() {
    return {
      businessName: "",
      firstName: "",
      loading: true,
      error: "",
    };
  },
  components: {
    LoadingComponent,
  },
  methods: {
    logout: function () {
      if (confirm("Are you sure you want to logout?")) {
        this.$store.dispatch(LOGOUT).then(() => {
          this.$router.push("/login");
        });
      }
    },
  },
  async mounted() {
    try {
      const response = await axios.get(
        "https://sandbox.d.greeninvoice.co.il/api/v1/account/me"
      );
      this.businessName = response.data.businesses[0].name;
      this.firstName = response.data.firstName;
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.error = "קרתה שגיאה";
      console.error(err);
    }
  },
  computed: {
    firstname: function () {
      return this.$store.getters.firstname;
    },
  },
};
</script>

<style lang="scss" scoped>
.welcome-component-container {
  width: 70vw;
  display: block;
  margin: 0 auto;
  overflow: hidden;
}

h1 {
  direction: rtl;
  text-align: center;
}

img {
  display: block;
  z-index: -1;

  @media only screen and ($media-query-mobile-screen) {
    margin-top: -15vh;
  }
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
  border: 2px solid $danger-color;
  font-family: "almoni-neue-dl", Times, serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.4s ease;

  &:hover {
    color: #fff;
    background: $danger-color;
  }
}
</style>
