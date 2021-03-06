import pool from '../Db/config';

export const createTables = () => {
  const createTablesQuery = `CREATE TABLE IF NOT EXISTS
    users(
        id serial,
        name character varying(255) NOT NULL,
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
        buyerName character varying(255) NOT NULL,
        buyerPhone character varying(255) NOT NULL,
        productName character varying(255) NOT NULL,
        description character varying(255) NOT NULL,
        quantity character varying(255) NOT NULL,
        location character varying(255) NOT NULL,
        street character varying(255),
        locationDesc character Varying(1024) NOT NULL,
        createdOn character varying(255) NOT NULL,
        updatedOn character varying(255) NOT NULL,
        state character varying(255) NOT NULL,
        numberOfBids character varying(50) NOT NULL,
        PRIMARY KEY(id)
    );
    CREATE TABLE IF NOT EXISTS
    price_descriptions(
        id serial,
        orderId integer NOT NULL,
        buyerId integer NOT NULL,
        delivererId integer NOT NULL,
        productName character varying(255) NOT NULL,
        description character varying(255) NOT NULL,
        quantity character varying(255) NOT NULL,
        location character varying(1024) NOT NULL,
        price integer NOT NULL,
        PRIMARY KEY(id)
    );
    INSERT INTO users (name, email, phoneNumber, password, isAdmin, isBuyer, status, numberOfOrders) 
    VALUES ('Pacifique Tuyizere', 'kigalicodingacademy@gmail.com', '+250788811122', '$2b$08$ASiZsryIorWE9/lAf5gA9O2PCsjwM/19ApfYpTccj9YkLbV8MIqTm', true, true, 'active', 0);
    INSERT INTO users (name, email, phoneNumber, password, isAdmin, isBuyer, status, numberOfOrders) 
    VALUES ('dammy user', 'dammyuser@ako.com', '+250788811122', '$2b$08$ASiZsryIorWE9/lAf5gA9O2PCsjwM/19ApfYpTccj9YkLbV8MIqTm', false, false, 'active', 0);`;
  pool
    .query(createTablesQuery)
    .then(() => console.log('Tables created successfully...'))
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
require('make-runnable');
