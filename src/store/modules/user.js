import { login, logout, getInfo } from "@/api/user";
import { adminMenu, normalMenu } from "@/utils/menu";

const state = {
  token: "",
  userInfo: {},
  role: "",
  menu: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  },
  SET_MENU: (state, menu) => {
    state.menu = menu;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { studentNumber, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ studentNumber: studentNumber.trim(), password: password })
        .then((response) => {
          const { data, otherMap } = response;
          const { role } = data;
          commit("SET_TOKEN", otherMap);
          commit("SET_USERINFO", data);
          commit("SET_ROLE", role);
          commit("SET_MENU", role === "admin" ? adminMenu : normalMenu);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_TOKEN", "");
      commit("SET_USERINFO", {});
      commit("SET_ROLE", "");
      resolve()
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
