import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

// TODO: create constants file

export const store = new Vuex.Store({
  state: {
    status: "",
  },
  actions: {
    ["HANDLE_LOGIN"]: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "https://sandbox.d.greeninvoice.co.il/api/v1/account/login",
            user
          )
          .then((response) => {
            const jwtToken = response.headers["x-authorization-bearer"];
            localStorage.setItem("user-token", jwtToken);
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
        axios.defaults.headers.common["Authorization"] = userToken;
        commit("AUTH_SUCCESS");
      }
    },
    ["SET_LOGIN_ERROR"]: ({ commit }, error) => {
      commit("AUTH_ERROR", error);
    },
  },
  mutations: {
    ["AUTH_REQUEST"]: (state) => {
      state.status = "loading";
    },
    ["AUTH_SUCCESS"]: (state) => {
      state.status = "success";
    },
    ["AUTH_ERROR"]: (state, error) => {
      state.status = error;
    },
  },
  getters: {
    isAuthenticated: (state) => state.status === "success",
    authStatus: (state) => state.status,
  },
});
