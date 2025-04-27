export default {
  namespaced: true,

  state: () => ({
    carts: [],
  }),

  mutations: {
    insert(state, payload) {
      state.carts.push({
        id: payload.id,
        title: payload.title,
        cover: payload.cover,
        price: payload.price,
        weight: payload.weight,
        quantity: 1,
      });
    },
    update(state, payload) {
      const idx = state.carts.findIndex(item => item.id === payload.id);
      if (idx !== -1) {
        if (payload.quantity > 0) {
          state.carts.splice(idx, 1, payload);
        } else {
          state.carts.splice(idx, 1);
        }
      }
    },
    set(state, payload) {
      state.carts = payload;
    },
  },

  actions: {
    add({ state, commit }, payload) {
      const cartItem = state.carts.find(item => item.id === payload.id);
      if (!cartItem) {
        commit('insert', payload);
      } else {
        const updatedItem = { ...cartItem, quantity: cartItem.quantity + 1 };
        commit('update', updatedItem);
      }
    },
    remove({ state, commit }, payload) {
      const cartItem = state.carts.find(item => item.id === payload.id);
      if (cartItem) {
        const updatedItem = { ...cartItem, quantity: cartItem.quantity - 1 };
        commit('update', updatedItem);
      }
    },
    set({ commit }, payload) {
      commit('set', payload);
    },
  },

  getters: {
    carts: state => state.carts,
    count: state => state.carts.length,
    totalPrice: state => state.carts.reduce((total, item) => total + item.price * item.quantity, 0),
    totalQuantity: state => state.carts.reduce((total, item) => total + item.quantity, 0),
    totalWeight: state => state.carts.reduce((total, item) => total + (item.weight * item.quantity), 0),
  },
};
