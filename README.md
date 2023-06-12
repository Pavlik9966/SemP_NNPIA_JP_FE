# I-Banking FE Application

This is a web application for online banking called I-Banking. It allows users to perform various banking operations
such as managing bank accounts and making transactions.

## Installation

- **Step 1**: Clone the repository to your local machine.
- **Step 2**: Navigate to the project directory.
- **Step 3**: Install the dependencies by running the following command: `npm install`
- **Step 4**: Start the development server with the following command: `npm run dev`
- **Step 5**: Open your web browser and visit `http://localhost:5173` to access the I-Banking App.

## Features

### Home Page

The home page displays user information and a table of their bank accounts. The user's information includes details such
as username, name, surname, date of birth, phone, email, address, and more.

The bank accounts table shows the account number, balance, and creation date for each account. Clicking on an account
redirects the user to the transaction details page for that account.

### Login Page

The login page allows users to log in to their account. Enter the username and password associated with the account to
authenticate. If the login is successful, the user is redirected to the home page. If the login fails, an error message
is displayed.

### Transactions Page

The transactions page displays a list of transactions for a specific bank account. It typically includes information
such as the transaction date, description, amount, and the account balance after the transaction. The page may also
provide options for filtering or sorting the transactions.

### Floating Button

A floating button is a user interface element that appears as a small button floating above the content of a web page.
It is often used to provide quick access to a specific action or feature. In the context of a banking application, a
floating button could be used for actions like creating a new transaction or initiating a fund transfer.

### Navigation

The navigation component typically consists of a menu or a set of links that allow users to navigate between different
pages or sections of the web application. It helps users easily switch between different functionalities, such as
accessing their accounts, viewing transactions, or logging out.

### New Transaction Modal

The new transaction modal allows users to create a new transaction. It includes fields to enter the account number of
the recipient, the amount, the transaction date, and a description. After entering the required information and clicking
the "Create" button, the transaction is created.