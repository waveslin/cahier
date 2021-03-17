const formats = {
  namespaced: true,
  state: {
    date_locale: 'en-CA',
    date_locale_list: ['zh-CN', 'fr-CA', 'en-CA', 'en-US'],
    date_format: { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }
  },
  getters: {
    getDateLocale: function (state) {
      return state.date_locale;
    },
    getDateLocaleList: function (state) {
      return state.date_locale_list;
    },
    getDateFormat: function (state) {
      return state.date_format;
    }
  },
  mutations: {
    setCurrentLocale: function (state, newDateLocale) {
      state.date_locale = newDateLocale;
    }
  }
};

export default formats;
