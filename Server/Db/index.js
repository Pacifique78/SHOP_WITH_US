import pool from './config';

export const querry = (queryString, values = []) =>
  pool.connect().then((client) =>
    client.query(queryString, values).then((res) => {
      client.release();
      return res.rows;
    })
  );
export default querry;
