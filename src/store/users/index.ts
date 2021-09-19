import axios from "axios";
import { Module } from "vuex";
import { User } from "@/interfaces/user";
import { Users } from "@/interfaces/users";
import { AppError } from "@/utils/AppError";
import { RootState } from "@/store/interfaces";
import { getRequestOptions } from "./utils";
import { UsersModuleState } from "./users.interfaces";

export const usersModule: Module<UsersModuleState, RootState> = {
  namespaced: true,
  state: {
    users: [],
    user: null,
    error: null,
  },
  actions: {
    async getUsers({ commit }, options = {}) {
      try {
        const { data } = await axios.get<Users>(`/search/users`, { params: getRequestOptions(options) });
        commit("SET_USERS", data.items);
      } catch (error) {
        const _error = new AppError("An error has occured trying to fetch users.", error);
        commit("SET_ERROR", _error);
      }
    },
  },
  mutations: {
    SET_USERS(state, users: User[]) {
      state.users = users;
    },
    SET_ERROR(state, error: Error) {
      state.error = error;
    },
  },
};
