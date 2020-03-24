import pool from '../Db/config';

export const createTables = () => {
  const createTablesQuery = `CREATE TABLE IF NOT EXISTS
    users(
        id serial,
        firstName character varying(50) NOT NULL,
        lastName character varying(50) NOT NULL,
        otherName character varying(255) NOT NULL,
        email character varying(50) UNIQUE NOT NULL,
        phoneNumber character varying(20) NOT NULL,
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
    );
    INSERT INTO users (firstName, lastName, otherName, email, phoneNumber, password, isAdmin, isBuyer, status, numberOfOrders) 
    VALUES ('Pacifique', 'Tuyizere', '', 'tuyizerepacifique@gmail.com', '+250788811122', '$2b$08$ASiZsryIorWE9/lAf5gA9O2PCsjwM/19ApfYpTccj9YkLbV8MIqTm', true, true, 'active', 0);
    INSERT INTO users (firstName, lastName, otherName, email, phoneNumber, password, isAdmin, isBuyer, status, numberOfOrders) 
    VALUES ('dammy', 'user', '', 'dammyuser@gmail.com', '+250788811122', '$2b$08$V3ymvmuOZOBZA9EtLSpmHei/m.xfY5hL4INynW0f18vuFnDQA2diq', false, false, 'active', 0);`;
  pool.query(createTablesQuery)
    .then(() => console.log('Tables created successfully...'))
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
require('make-runnable');
