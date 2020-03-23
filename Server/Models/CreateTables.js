import pool from '../Db/config';

export const createTables = () => {
  const createTablesQuery = `CREATE TABLE IF NOT EXISTS
    users(
        id serial,
        firstName character varying(50) NOT NULL,
        lastName character varying(50) NOT NULL,
        otherName character varying(255) NOT NULL,
        phoneNumber character varying(20) UNIQUE NOT NULL,
        password character varying(1024) NOT NULL,
        isAdmin boolean NOT NULL,
        isBuyer boolean NOT NULL,
        status character varying(50) NOT NULL,
        numberOfOrders character varying(50) NOT NULL,
        PRIMARY KEY(id)
    );
    CREATE TABLE IF NOT EXISTS
    orders(
        id serial,
        buyerId integer NOT NULL,
        productName character varying(255) NOT NULL,
        description character varying(255) NOT NULL,
        quantity character varying(255) NOT NULL,
        location character varying(255) NOT NULL,
        createdon date NOT NULL,
        state character varying(255) NOT NULL,
        PRIMARY KEY(id)
    );
    CREATE TABLE IF NOT EXISTS
    price_descriptions(
        id serial,
        buyerId integer NOT NULL,
        orderId integer NOT NULL,
        productName character varying(255) NOT NULL,
        description character varying(255) NOT NULL,
        quantity character varying(255) NOT NULL,
        price integer NOT NULL,
        PRIMARY KEY(id)
    );`;
  pool.query(createTablesQuery)
    .then(() => console.log('Tables created successfully...'))
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
require('make-runnable');
