import { READ_CATEGORIES, OPER_CATEGORY_ERR } from "../types";
import axios from "../../settings/api";

const state = {
  categories: null,
  error: null
};

const getters = {
  categories: state => state.categories,
  categoryError: state => state.error
};

const mutations = {
  READ_CATEGORIES: (state, payload) => {
    state.categories = payload.data;
    state.error = null;
  },
  OPER_CATEGORY_ERR: (state, payload) => {
    state.error = payload;
  }
};

const actions = {
  readCategories: async context => {
    try {
      const response = await axios.get("/api/categories");
      context.commit(READ_CATEGORIES, response.data);
    } catch (e) {
      const errorData = e.response ? e.response.data : e;
      context.commit(OPER_CATEGORY_ERR, errorData.message);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
