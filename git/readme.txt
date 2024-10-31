FOR ME:
Export table "works" (last step) using:

pg_dump -U postgres -d portfolio -t works -f works_table_dump.sql

----------
FOR GIT:
All demo works in this portfolio belong to Sergey Vasnev. Find him on:
https://sergey_vasnev.artstation.com/

Database setup:

Requirements: PostgreSQL
Open any terminal. Login to root user "postgres", and run the following command:

CREATE DATABASE portfolio;

Now, you can exit the postgres console.
Next, make sure you are working in the directory of the file "works_table_dump.sql" (otherwise you must specify the full path), and open a terminal there.
Import all data from "portfolio" database using:

psql -U postgres -d portfolio -f works_table_dump.sql



NestJS setup:

Requirements: Node.js
Make sure you have the database link correctly set.
Navigate to "nestjs-backend\src\app.module.ts" and change the username and password with your database credentials.

Open a terminal in the "nestjs-backend" folder.
First off, install dependencies:

npm install

Then, run the server and keep it open:

npm run start




React setup:

Requirements: Node.js
Navigate to "react-frontend\src\api.js" and make sure that API_URL = "http://localhost:3000".

Open a terminal in the "react-frontend" folder.
First off, install dependencies:

npm install

Then, run the server and keep it open:

npm start


Extra:

You can navigate to the root directory which contains both "react-frontend" and "nestjs-backend", and run:

npm install

This will initialize the concurrent run library.
Simply running "npm start" in the root folder will start both servers at the same time.

Testing:

In the "nestjs-backend" folder, you can run tests to check CRUD functionalities:

npm run test