import Vue from "vue";
import axios from "axios";

export const state = {
  currentUserDetails: null
};

export const mutations = {
  SET_CURRENT_USER_DETAILS(initialState, newValue) {
    Vue.set(initialState, "currentUserDetails", newValue);
  }
};

export const actions = {
  // get main info about user
  fetchUserInfo({ commit, dispatch }) {
    return axios
      .get("/user")
      .then(({ data }) => {
        commit("SET_CURRENT_USER_DETAILS", data);

        return data;
      })
      .catch(e => {
        if (e.response.status === 401) {
          dispatch("auth/logout", {}, { root: true }).then(() => {
            window.location.reload();
          });
        }

        return {
          error: e
        };
      });
  }
};

export const getters = {
  // detailed info of current user
  userInfo(state) {
    return state.currentUserDetails;
  },
  // return current user id
  userId(state) {
    return state.currentUserDetails && state.currentUserDetails.id;
  }
};
