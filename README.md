After cloning the repo and installing the dependencies, you can run the project by following the steps below:

# Restaurant API Setup Guide

Follow these steps to set up and run the Restaurant API:

1. **Start the MySQL Server**
   Ensure that your MySQL server is running.

2. **Create a `.env` File**

   Create a `.env` file in the root directory of your project and add the following lines, replacing `<YOUR_DB_NAME>` with the name of your database, and `<YOUR_REFRESH_TOKEN_SECRET>` and `<YOUR_ACCESS_TOKEN_SECRET>` with your generated secrets:

   ```bash
   DATABASE_URL="mysql://root:@localhost:3306/<YOUR_DB_NAME>"
   NODE_ENV=development
   JWT_REFRESH_TOKEN_SECRET=<YOUR_REFRESH_TOKEN_SECRET>
   JWT_ACCESS_TOKEN_SECRET=<YOUR_ACCESS_TOKEN_SECRET>
   ```

   To generate secret keys, you can use the following command twice to generate two different keys:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Run the Migrations**
   Run the following command to create the tables in your database:

```bash
npx prisma migrate dev
```

4. **Run the Application**
   Start your Node.js application using your preferred method (e.g., `npm start`).

5. **Access the Application**
   Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the application.

## Dataflow

```
User --> app.ts --> router.ts --> middleware (optional) --> controller.ts --> service.ts --> response --> router.ts --> app.ts --> User
```

## API Endpoints

1. To create a new user:
   POST request on user/signup

Request Body:
username: min length is 5 and max 15
password: min length of 4
email:should be a valid email
phone: optional with length ten

Response:
201 for user created successfully
209 for duplicate username
500 for internal server error
422 for invalid user data

2. To Login a user:
   POST request on user/login

Request Body:
username: min length is 5 and max 15
password: min length of 4

Response:
400 for if not all the fields are filled
401 for unauthorised
OK for login with Access Token in response (restJWT) and also the redirect url(response.redirect) and refresh token in cookies
