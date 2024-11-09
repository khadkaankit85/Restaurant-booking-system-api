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

to create a reservation:
