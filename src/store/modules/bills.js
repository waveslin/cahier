import formats from './formats';

const bills = {
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
    initial ({ commit, state }) {
      state.database.transaction((tx) => {
        const query = 'CREATE TABLE IF NOT EXISTS bills (id unique, amount, category, description, month, year, bill_date, created_date)';
        tx.executeSql(query);
      });
    },
    addNewRecordAsync ({ commit, state }, bill) {
      const date = new Date();
      const datetime = date.toLocaleDateString(formats.getters.getDateLocale, formats.getters.getDateFormat);
      bill.bill_date = bill.bill_date instanceof Date && !isNaN(bill.bill_date) ? bill.bill_date : datetime;
      const values = [bill.id, bill.amount, bill.category, bill.description, bill.bill_date, bill.month, bill.year, datetime];
      state.database.transaction((tx) => {
        const query = 'INSERT INTO bills (id, amount, category, description, bill_date, month, year, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        tx.executeSql(query, values);
      });
    },
    editRecordAsync ({ commit, state }, bill) {
      const date = new Date();
      const datetime = date.toLocaleDateString(formats.getters.getDateLocale, formats.getters.getDateFormat);
      bill.bill_date = bill.bill_date instanceof Date && !isNaN(bill.bill_date) ? bill.bill_date : datetime;
      const values = [bill.amount, bill.category, bill.description, bill.bill_date, bill.month, bill.year, bill.id];
      state.database.transaction((tx) => {
        const query = 'UPDATE bills SET amount = ?, category = ?, description = ?, bill_date = ?, month = ?, year = ? WHERE id = ?';
        tx.executeSql(query, values);
      });
    },
    deleteRecordAsync ({ commit, state }, id) {
      state.database.transaction((tx) => {
        tx.executeSql('DELETE FROM bills WHERE id = ?', [id]);
      });
    },
    getRecordsAsync ({ commit, state }) {
      state.database.transaction((tx) => {
        tx.executeSql('SELECT * FROM bills', [], (tx, results) => {
          commit('setRecords', Object.values(results.rows));
        });
      });
    },
    getRecordsByCreatedDateAsync ({ commit, state }, [month, year]) {
      state.database.transaction((tx) => {
        const query = 'SELECT * FROM bills WHERE month = ? AND year = ?';
        tx.executeSql(query, [month, year], (tx, results) => {
          commit('setRecords', Object.values(results.rows));
        });
      });
    }
  }
};

export default bills;

// const date = new Date();
// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// console.log(event.toLocaleDateString(undefined, options));
// tx.executeSql('INSERT INTO bills (id, amount, category, description, date) VALUES (?, ?, ?, ?, ?)', [13, 13.62, 'daily', '', date.toLocaleDateString(undefined, options)]);
// tx.executeSql('INSERT INTO bills (id, amount, category, description, date) VALUES (?, ?, ?, ?, ?)', [14, 247, 'others', 'buy 3 new clothes', date.toLocaleDateString(undefined, options)]);
