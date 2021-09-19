import { createStore } from "vuex";
import { usersModule } from "./users";
import { version } from "../../package.json";

export default createStore({
  actions: {},
  mutations: {},
  state: { version },
  modules: { usersModule },
});
