Overview
This is a RESTful API built using Node.js, Express, and MongoDB, designed to manage a bookstore's inventory. The API allows users to perform CRUD (Create, Read, Update, Delete) operations on books in the store. It also supports advanced features like filtering, sorting, pagination, and limiting fields in responses.

Features
CRUD operations: Create, Read, Update, Delete books.
Advanced Filtering: Filter books by price range, genre, and other fields.
Sorting: Sort books by different fields such as price, title, and published date.
Pagination: Handle large datasets with pagination.
Field Limiting: Limit the fields returned in the response.
Error Handling: Graceful handling of errors, including validation, missing data, and server errors.
Technologies
Node.js
Express.js
MongoDB (Mongoose)
dotenv for environment variable management
Nodemon for automatic server restarts during development
Prerequisites
To run the API, ensure that you have the following installed:

Node.js (v14 or higher)
MongoDB (either MongoDB Atlas or a local instance)
Postman (optional, for testing the API)

Installation
Clone the repository:
git clone https://github.com/yourusername/BookstoreAPI.git
cd BookstoreAPI

Install dependencies:
npm install
Create a .env file in the root of the project with the following variables:

env
Copy code
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://<username>:<password>@cluster0.mongodb.net/BookStore?retryWrites=true&w=majority
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password

Run the application:
npm run start


API Endpoints
1. Create a Book
POST /api/books

Request Body:
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "publishedDate": "2023-09-01",
  "price": 19.99,
  "inStock": true
}

Success Response:
{
  "status": "success",
  "data": {
    "book": {
      "_id": "60c72b2f5f1b2c001c8e4d5f",
      "title": "Book Title",
      "author": "Author Name",
      "genre": "Fiction",
      "publishedDate": "2023-09-01",
      "price": 19.99,
      "inStock": true
    }
  }
}

2. Get All Books
GET /api/books
Query Parameters:
sort: Sort by any field, e.g., price, title
page: Pagination page number
limit: Number of results per page
fields: Limit returned fields, e.g., title,author
price[gte], price[lte]: Filter books by price range
Example Request:
GET http://localhost:3000/api/books?sort=price&page=1&limit=10
Success Response:
{
  "status": "success",
  "results": 10,
  "data": {
    "books": [
      {
        "_id": "60c72b2f5f1b2c001c8e4d5f",
        "title": "Book Title",
        "author": "Author Name",
        "price": 19.99
      },
      ...
    ]
  }
}

4. Get a Book by ID
GET /api/books/:id
Success Response:
{
  "status": "success",
  "data": {
    "book": {
      "_id": "60c72b2f5f1b2c001c8e4d5f",
      "title": "Book Title",
      "author": "Author Name",
      "genre": "Fiction",
      "publishedDate": "2023-09-01",
      "price": 19.99,
      "inStock": true
    }
  }
}

Error Response (if book does not exist):
{
  "status": "fail",
  "message": "No book found with that ID"
}

4. Update a Book
PATCH /api/books/:id

Request Body:
{
  "author": "New Author Name"
}
Success Response:
{
  "status": "success",
  "data": {
    "book": {
      "_id": "60c72b2f5f1b2c001c8e4d5f",
      "title": "Book Title",
      "author": "New Author Name",
      "price": 19.99
    }
  }
}
Error Handling:

Returns 400 if price is negative.
Returns 404 if book ID does not exist.

5. Delete a Book
DELETE /api/books/:id

Success Response:
{
  "status": "success",
  "data": null
}
Error Response (if book does not exist):
{
  "status": "fail",
  "message": "No book found with that ID"
}
Advanced API Features
Pagination
Example: /api/books?page=2&limit=5
Retrieves the second page of 5 books per page.
Filtering
Example: /api/books?price[gte]=10&price[lte]=20
Retrieves books with prices between 10 and 20.
Sorting
Example: /api/books?sort=price
Sorts books by price in ascending order.
Field Limiting
Example: /api/books?fields=title,author
Retrieves only the title and author fields for each book.
Error Handling
The API implements comprehensive error handling for:

Missing required fields during book creation or update.
Negative price values.
Non-existent book IDs for GET, PATCH, and DELETE operations.
Database connection issues.
