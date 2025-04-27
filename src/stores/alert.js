export default {
  namespaced: true,
  
  state: () => ({
    status: false,
    color: 'success', // options: success, warning, error
    text: '',
  }),
  
  mutations: {
    set(state, { status, text, color }) {
      state.status = status;
      state.text = text;
      state.color = color;
    },
  },

  actions: {
    set({ commit }, payload) {
      commit('set', payload);
    },
  },

  getters: {
    status: state => state.status,
    color: state => state.color,
    text: state => state.text,
  },
};
