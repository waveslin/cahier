const jobs = {
  namespace: true,
  state: {
    database: openDatabase('jobs', '1.0', 'This database is stored at the local browser and used by Cahier. DO NOT KEEP ANY SENSITIVE DATA.', 5 * 1024 * 1024)
  }
};

export default jobs;
