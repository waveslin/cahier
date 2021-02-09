const bookkeeping = {
  namespaced: true,
  state: {
    database: openDatabase('cahier', '1.0', 'ThIS database is stored at the local browser and used by Cahier. DO NOT KEEP ANY SENSITIVE DATA.', 5 * 1024 * 1024),
    records: []
  }
};

export default bookkeeping;
