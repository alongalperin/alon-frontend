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
    ["SET_USER_TOKEN"]: ({ commit }, token) => {
      commit("AUTH_SUCCESS");
    },
    ["INIT_APP_USER_TOKEN"]: ({ commit }) => {
      const userToken = localStorage.getItem("user-token");
      if (userToken) {
        axios.defaults.headers.common["Authorization"] = userToken;
        commit("AUTH_SUCCESS");
      }
    },
  },
  mutations: {
    ["AUTH_REQUEST"]: (state) => {
      state.status = "loading";
    },
    ["AUTH_SUCCESS"]: (state) => {
      state.status = "success";
    },
    ["AUTH_ERROR"]: (state) => {
      state.status = "error";
    },
  },
  getters: {
    isAuthenticated: (state) => state.status === "success",
    authStatus: (state) => state.status,
  },
});
