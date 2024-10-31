# Fullstack Portfolio Project

This project is a fullstack portfolio that closely resembles the ArtStation grid style showcase. All demo works in this portfolio belong to **Sergey Vasnev**. You can find him on [ArtStation](https://sergey_vasnev.artstation.com/).

## Database Setup

**Requirements:** PostgreSQL

1. Open any terminal. Login to root user "postgres", and run the following command:
    ```sh
    CREATE DATABASE portfolio;
    ```
2. Now, you can exit the postgres console.
3. Make sure you are working in the directory of the file `works_table_dump.sql` (otherwise you must specify the full path), and open a terminal there.
4. Import all data from the "portfolio" database using:
    ```sh
    psql -U postgres -d portfolio -f works_table_dump.sql
    ```

## NestJS Setup

**Requirements:** Node.js

1. Make sure you have the database link correctly set.
2. Navigate to `nestjs-backend/src/app.module.ts` and change the username and password with your database credentials.
3. Open a terminal in the `nestjs-backend` folder.
4. First off, install dependencies:
    ```sh
    npm install
    ```
5. Then, run the server and keep it open:
    ```sh
    npm run start
    ```

## React Setup

**Requirements:** Node.js

1. Navigate to `react-frontend/src/api.js` and make sure that `API_URL = "http://localhost:3000"`.
2. Open a terminal in the `react-frontend` folder.
3. First off, install dependencies:
    ```sh
    npm install
    ```
4. Then, run the server and keep it open:
    ```sh
    npm start
    ```

## Extra

You can navigate to the root directory which contains both `react-frontend` and `nestjs-backend`, and run:
```sh
npm install
```
This will initialize the concurrent run library. Simply running npm start in the root folder will start both servers at the same time.

## Testing

In the `nestjs-backend` folder, you can run tests to check CRUD functionalities:
```sh
npm run test
```
