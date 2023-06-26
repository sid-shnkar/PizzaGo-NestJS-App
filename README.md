* Updates completed
* Do replace MONGO_SRV with your connection string

# PizzaGo-NestJS-App
A full-stack web development project built using **ReactJS**, **NestJS**, **MongoDB** and **Express**. It simulates a food delivery app for a pizza delivery company. It allows users to log in/sign up on the web app, view all the available menu items, perform CRUD operations on their cart, and place an order. After placing an order, the user receives a confirmation email containing details about their order, like quantity, item name, price, etc., on their email address. The admin can manage all the users and pizzas by performing CRUD operations on them.

## Steps to run the program:
To start running up the project, open the terminal and type the following command then hit enter:
```
 npm install
 npm run start
```

**Note:** For email sending services, I have used **Mailgun**, refer to [here](https://www.mailgun.com/). You need to create a free acoount inorder to get your API key
and SMTP credentials, that are required by this feature to be working. Replace the key values in ```backend/src/pizza``` with your own credentials.
