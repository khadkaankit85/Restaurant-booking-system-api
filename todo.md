# Restaurant Management API

A restaurant management API built using Prisma and MySQL for a single restaurant. It allows you to create, update, and manage users, tables, reservations, and items.

## To-Do List

- [x] **Setup Prisma and MySQL**

  - [x] Configure the Prisma client with MySQL.
  - [x] Set up the database connection using `DATABASE_URL`.

- [x] **Create Database Models**

  - [x] Define the `Restaurant` model.
  - [x] Define the `User` model with roles (`admin`, `user`).
  - [x] Define the `Table` model with booking statuses (`booked`, `unbooked`).
  - [x] Define the `Reservation` model.
  - [x] Define the `ReservedItem` model for items reserved during a reservation.
  - [x] Define the `Item` model.

- [] **Implement API Endpoints**

  - [x] **User Endpoints**
    - [x] Create a user (sign-up).
    - [x] Authenticate a user (sign-in).
    - [x] Update user information.
    - [x] Delete a user.
    - [x] Assign user roles.
  - [x] **Single Restaurant Endpoints**
    - [x] Add new details for the restaurant.
    - [x] Update restaurant information.
    - [x] Get restaurant details.
  - [ ] **Table Endpoints**
    - [ ] Add a new table.
    - [ ] Update table status.
    - [ ] Delete a table.
    - [x] Get available tables for the restaurant.
  - [x] **Reservation Endpoints**
    - [x] Make a reservation.
    - [x] Update a reservation.
    - [x] Cancel a reservation.
    - [x] View reservations for a user.
  - [ ] **Item Endpoints**
    - [x] Add new items to the menu.
    - [x] Update item details.
    - [x] Delete items.
    - [x] Get a list of items.

- [ ] **Authentication and Authorization**

  - [x] Implement authentication (JWT).
  - [x] Secure endpoints based on user roles.

- [ ] **Testing**

  - [ ] Unit testing for each endpoint.
  - [ ] Integration tests for the entire flow.

- [ ] **Deployment**
  - [ ] Set up environment variables for production.
  - [ ] Deploy the API to a cloud service.
  - [ ] Configure a production database.
