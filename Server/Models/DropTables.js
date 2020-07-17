import pool from '../Db/config';

export const dropTables = () => {
  const dropTablesQuerry = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS price_descriptions CASCADE;`;
  pool
    .query(dropTablesQuerry)
    .then(() => console.log('Tables deleted...'))
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
require('make-runnable');
