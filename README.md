# Book-review
A simple RESTful API built with Node.js, Express, and Sequelize (SQLite) that allows users to sign up, log in, add/search/get books, and post/update/delete reviews.

Server will run on: http://localhost:3000

API Endpoints
Signup
POST /signup
{
  "username": "rutuja",
  "password": "123456"
}

Login
POST /login
{
  "username": "rutuja",
  "password": "123456"
}

Add Book 
POST /books
Headers:
Authorization: Bearer <your_token>
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help"
}

Get All Books
GET /books

Get Book by ID (with reviews)
GET /books/1

Add Review 
POST /books/1/reviews

![image alt](https://github.com/rutujakesare/Book-review/blob/b8e472dbed3351eaebe75690ef5c7c9fee72485f/Screenshot%202025-05-23%20004727.png)
