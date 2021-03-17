const options = {
  namespaced: true,
  state: {
    categories: ['food', 'rent', 'grocery', 'shopping', 'medical', 'tansportation', 'entertainment', 'business expense', 'luxery', 'travel', 'charity', 'other']
  },
  getters: {
    getCategoryOptions: function (state) {
      return state.categories;
    }
  }
};

export default options;
