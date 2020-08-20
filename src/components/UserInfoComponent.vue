<template>
  <div class="user-info-component">
    <h1 class="user-info-title">עמוד אישי</h1>
    <div>
      <h2>פרטים אישיים</h2>
      <div class="details-display">
        <div class="details-box">
          <div class="details-title">
            <p>שם פרטי</p>
          </div>
          <div class="details-body">
            <p>{{ user.firstName }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>שם משפחה</p>
          </div>
          <div class="details-body">
            <p>{{ user.lastName }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>מספר עסקים רשומים</p>
          </div>
          <div class="details-body">
            <p>{{ user.activeBusinessCount }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>תאריך הצטרפות</p>
          </div>
          <div class="details-body">
            <p>{{ user.signUpDate }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>כתובת מייל</p>
          </div>
          <div class="details-body">
            <p>{{ user.email }}</p>
          </div>
        </div>
      </div>
      <!-- ############### Businesses Details ############### -->
      <h2 class="business-list-title">העסקים שלך</h2>
      <div v-for="business in businesses" :key="business.id" class="details-display">
        <div class="details-box">
          <div class="details-title">
            <p>שם העסק</p>
          </div>
          <div class="details-body">
            <p>{{ business.name }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>שם העסק באנגלית</p>
          </div>
          <div class="details-body">
            <p>{{ business.nameEn }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>כתובת</p>
          </div>
          <div class="details-body">
            <p>{{ business.address }} {{ business.city }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>כתובת מייל לשליחת הודעות</p>
          </div>
          <div class="details-body">
            <p>{{ business.notifyEmail }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>תאריך רישום העסק באתר</p>
          </div>
          <div class="details-body">
            <p>{{ business.creationDate }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>תאריך עדכון אחרון</p>
          </div>
          <div class="details-body">
            <p>{{ business.lastUpdateDate }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>סוג עסק</p>
          </div>
          <div class="details-body">
            <p>{{ business.type }}</p>
          </div>
        </div>
        <div class="details-box">
          <div class="details-title">
            <p>צבע כפתור שליחה</p>
          </div>
          <div class="details-body">
            <div
              style="width: 120px; height: 20px"
              v-bind:style="{background:business.emailButtonBackgroundColor}"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserInfo",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        signUpDate: "",
        activeBusinessCount: 0,
      },
      businesses: [],
    };
  },
  components: {},
  async mounted() {
    let response;
    try {
      response = await axios.get(
        "https://sandbox.d.greeninvoice.co.il/api/v1/account/me"
      );
    } catch (err) {
      console.log(err);
      return;
    }

    const userDetailsResponse = response.data;
    const bussinessDetailsResponse = response.data.businesses;
    this.user = resolveUserDetails(userDetailsResponse);
    this.businesses = await resolveBusinessDetails(bussinessDetailsResponse);
  },
};

function resolveUserDetails(rawUserData) {
  const user = {};
  user.firstName = rawUserData.firstName;
  user.lastName = rawUserData.lastName;
  user.email = rawUserData.email;
  user.signUpDate = formatUnixDate(rawUserData.signUpDate);
  user.activeBusinessCount = rawUserData.activeBusinessCount;

  return user;
}

async function resolveBusinessDetails(businessesRawData) {
  const businesses = [];
  const businessTypes = await fetchBusinessTypes();
  for (const business of businessesRawData) {
    const newBusiness = {};
    newBusiness.id = business.id;
    newBusiness.name = business.name;
    newBusiness.nameEn = business.nameEn;
    newBusiness.address = business.address;
    newBusiness.city = business.city;
    newBusiness.notifyEmail = business.notifyEmail;
    newBusiness.creationDate = formatUnixDate(business.creationDate);
    newBusiness.lastUpdateDate = formatUnixDate(business.lastUpdateDate);
    newBusiness.type = businessTypes.get(business.type);
    newBusiness.emailButtonBackgroundColor =
      business.settings.emailButtonBackgroundColor;
    businesses.push(newBusiness);
  }
  return businesses;
}

function formatUnixDate(unixDate) {
  return new Date(unixDate * 1000).toLocaleDateString("en-GB");
}

async function fetchBusinessTypes() {
  let response;

  try {
    response = await axios.get(
      "https://sandbox.d.greeninvoice.co.il/api/v1/businesses/types"
    );
  } catch (err) {
    console.log(err);
  }

  return createMapFromArray(response.data);
}

function createMapFromArray(arr) {
  const result = new Map();

  for (const obj of arr) {
    result.set(obj.id, obj.name);
  }
  return result;
}
</script>

<style style lang="scss" scoped>
p {
  font-size: 1.2rem;
}

.user-info-title {
  text-align: center;
}

.user-info-component {
  width: 90vw;
  margin: 0 auto;
  margin-top: 2vh;
  padding-bottom: 5vh;
}

.business-list-title {
  margin-top: 5vh;
}

.details-display {
  width: 80%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 1rem;
}

.details-display div {
  height: 6vh;
}

.details-box {
  display: flex;
  flex-direction: column;

  .details-title {
    font-weight: 700;
  }

  .details-title p {
    margin: 0px;
  }

  .details-body p {
    margin: 0px;
  }
}

@media only screen and ($media-query-mobile-screen) {
  h2 {
    margin-right: 4vw;
    text-decoration: underline;
  }
  .details-display {
    padding-right: 3vw;
  }
}
</style>
