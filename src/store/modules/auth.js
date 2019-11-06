import Vue from "vue";
import axios from "axios";
import config from "@/config";

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(`${config.APP_NAME}.${key}`));
}

function saveState(key, authModuleState) {
  if (authModuleState) {
    window.localStorage.setItem(
      `${config.APP_NAME}.${key}`,
      JSON.stringify({
        ...authModuleState
      })
    );
  } else {
    window.localStorage.removeItem(key);
  }
}

function clearLocalStorageData() {
  for (let i = 0; i < window.localStorage.length; i++) {
    const itemKey = localStorage.key(i);

    if (itemKey.startsWith(`${config.APP_NAME}.`)) {
      window.localStorage.removeItem(itemKey);
    }
  }
}

export const state = {
  currentUser: getSavedState("auth.currentUser")
};

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common["Authorization"] = state.currentUser
    ? `${state.currentUser.token_type} ${state.currentUser.token}`
    : "";
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    Vue.set(state, "currentUser", newValue);
    saveState("auth.currentUser", newValue);
    setDefaultAuthHeaders(state);
  }
};

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser;
  }
};

export const actions = {
  // This is automatically run in `src/store.js` when the app
  // starts.
  init({ state }) {
    setDefaultAuthHeaders(state);
  },

  login({ commit }, data) {
    return axios.post("/auth/login", data).then(({ data }) => {
      commit("SET_CURRENT_USER", data);
    });
  },

  logout({ commit }) {
    delete axios.defaults.headers.common["Authorization"];
    clearLocalStorageData();
    commit("SET_CURRENT_USER", null);
    commit("user/SET_CURRENT_USER_DETAILS", null, { root: true });
  },

  // validate user code
  verify({ commit }, data) {
    return axios.post("/auth/login/verify", data).then(({ data }) => {
      commit("SET_CURRENT_USER", data);
    });
  }
};
