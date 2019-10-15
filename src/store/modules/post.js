// Initial state
const state = {
  posts: [],
  error: null
};

const getters = {
  posts: state => state.posts,
  postError: state => state.error
};

const mutations = {
  READ_POSTS: (state, payload) => {
    state.posts = payload.data;
  },
  READ_POST: (state, payload) => {}
};

const actions = {};

export default {
  state,
  getters,
  actions,
  mutations
};
