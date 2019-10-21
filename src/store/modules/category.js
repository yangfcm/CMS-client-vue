import { READ_CATEGORIES, READ_CATEGORY, OPER_CATEGORY_ERR } from "../types";
import axios from "../../settings/api";

const state = {
  categories: null,
  category: null,
  error: null
};

const getters = {
  categories: state => state.categories,
  category: state => state.category,
  categoryError: state => state.error
};

const mutations = {
  READ_CATEGORIES: (state, payload) => {
    state.categories = payload.data;
    state.error = null;
  },
  READ_CATEGORY: (state, payload) => {
    state.category = payload.data;
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
  },

  readCategory: async (context, id) => {
    try {
      const response = await axios.get(`/api/categories/${id}`);
      context.commit(READ_CATEGORY, response.data);
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
