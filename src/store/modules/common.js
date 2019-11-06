import Vue from "vue";

export const state = {
  isMobile: null
};

export const mutations = {
  SET_IS_MOBILE(state, isMobile) {
    state.isMobile = isMobile;
  }
};

export const getters = {
  isMobile(state) {
    return state.isMobile;
  }
};
