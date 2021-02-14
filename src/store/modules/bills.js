const bookkeeping = {
  namespaced: true,
  state: {
    database: openDatabase('cahier', '1.0', 'ThIS database is stored at the local browser and used by Cahier. DO NOT KEEP ANY SENSITIVE DATA.', 5 * 1024 * 1024),
    records: []
  },
  getters: {
    getRecords: (state) => {
      return state.records;
    }
  },
  mutations: {
    setRecords: (state, newRecords) => {
      state.records = newRecords;
    }
  },
  actions: {
    getRecordsAsync ({ commit, state }) {
      state.database.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS bills (id unique, amount, category, reason, date)');
        tx.executeSql('SELECT * FROM bills', [], (tx, results) => {
          commit('setRecords', Object.values(results.rows));
        });
      });
    }
  }
};

export default bookkeeping;

// const date = new Date();
// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// console.log(event.toLocaleDateString(undefined, options));
// tx.executeSql('INSERT INTO bills (id, amount, category, reason, date) VALUES (?, ?, ?, ?, ?)', [13, 13.62, 'daily', '', date.toLocaleDateString(undefined, options)]);
// tx.executeSql('INSERT INTO bills (id, amount, category, reason, date) VALUES (?, ?, ?, ?, ?)', [14, 247, 'others', 'buy 3 new clothes', date.toLocaleDateString(undefined, options)]);
