import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// TODO: create constants file

export const store = new Vuex.Store({
  state: {
    status: "",
    firstname: localStorage.getItem("user-firstname") || "",
  },
  actions: {
    ["HANDLE_LOGIN"]: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "https://sandbox.d.greeninvoice.co.il/api/v1/account/login",
            user
          )
          .then((response) => {
            const userToken = response.headers["x-authorization-bearer"];
            setAuthTokenInHeaders(userToken);
            localStorage.setItem("user-token", userToken);
            localStorage.setItem("user-firstname", response.data.firstName);
            commit("AUTH_SUCCESS");
            resolve();
          })
          .catch((err) => {
            reject(err.response.data.errorMessage);
          });
      });
    },
    ["INIT_APP_USER_TOKEN"]: ({ commit }) => {
      const userToken = localStorage.getItem("user-token");
      if (userToken) {
        setAuthTokenInHeaders(userToken);
        commit("AUTH_SUCCESS");
      }
    },
    ["LOGOUT"]: ({ commit }) => {
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-firstname");
      commit("LOGOUT");
    },
  },
  mutations: {
    ["AUTH_REQUEST"]: (state) => {
      state.status = "loading";
    },
    ["AUTH_SUCCESS"]: (state) => {
      state.status = "success";
    },
    ["LOGOUT"]: (state) => {
      /* todo: clearn localstorage */
      /* todo: clean username from localstorage, there is no need in this */
      state.status = "";
    },
  },
  getters: {
    isAuthenticated: (state) => state.status === "success",
    authStatus: (state) => state.status,
    firstname: (state) => state.firstname,
  },
});

function setAuthTokenInHeaders(token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
