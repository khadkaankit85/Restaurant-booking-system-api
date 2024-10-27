> After cloning the repo and installing the dependencies, you can run the project by following the steps below:

# Restaurant API Setup Guide

Follow these steps to set up and run the Restaurant API:

1. **Start the MySQL Server**
   Ensure that your MySQL server is running.

2. **Create a `.env` File**
   Create a `.env` file in the root directory of your project and add the following line, replacing `<NAME OF YOUR DB>` with the name of your database:

   ```bash
   DATABASE_URL="mysql://root:@localhost:3306/<NAME OF YOUR DB>"
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

User Routes:
-PUT /update-data - username, password, email, phone to update user data
-PUT /change-password- username, oldpassword, newpassword to change password
-PUT /change-username -oldUsername, newUsername to change username
-PUT /upate-role - username, role to update role, only admin can update role
-DELETE /remove-user- username, password to delete account.
-POST /login - username, password to login
-POST /signup - username, password, email, phone(optional) to signup.
