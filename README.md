# Social-Network-API
This project is a backend API for a social network application built with Express.js and MongoDB. It allows users to share thoughts, react to friends' posts, and manage a friend list. The API uses Mongoose ODM for database modeling and supports timestamp formatting with a JavaScript date library or the native Date object. 

# Social Network API

# Description
This project is a social network API built using Express.js for routing, MongoDB as the database, and Mongoose as the ODM (Object Data Modeling) tool. The API allows users to share thoughts, react to friends' thoughts, and create a friend list. It is designed to handle large amounts of unstructured data, making it ideal for a social media startup.

The API supports CRUD operations for users and thoughts, as well as adding and removing friends and reactions to thoughts. A walkthrough video demonstrating the functionality is included in this repository.

# Table of Contents
Installation

Usage

API Routes

Models

Walkthrough Video

Technologies Used

License

# Installation
To set up the project locally, follow these steps:

Clone the repository:


git clone <repository-url>
Navigate to the project directory:


cd social-network-api
Install dependencies:


npm install
Start the server:


npm start
The server will start running on http://localhost:3001.

# Usage
To use the API, you can test the routes using a tool like Insomnia or Postman. Below are the available routes and their functionality.

API Routes
Users
GET /api/users - Retrieve all users.

GET /api/users/:userId - Retrieve a single user by ID with populated thought and friend data.

POST /api/users - Create a new user.

json

{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
PUT /api/users/:userId - Update a user by ID.

DELETE /api/users/:userId - Delete a user by ID.

Thoughts
GET /api/thoughts - Retrieve all thoughts.

GET /api/thoughts/:thoughtId - Retrieve a single thought by ID.

POST /api/thoughts - Create a new thought.

json

{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino"
}
PUT /api/thoughts/:thoughtId - Update a thought by ID.

DELETE /api/thoughts/:thoughtId - Delete a thought by ID.

Friends
POST /api/users/:userId/friends/:friendId - Add a friend to a user's friend list.

DELETE /api/users/:userId/friends/:friendId - Remove a friend from a user's friend list.

Reactions
POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought.

json

{
  "reactionBody": "This is a reaction!",
  "username": "lernantino"
}
DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought.

Models
User
username: String, Unique, Required, Trimmed.

email: String, Required, Unique, Valid email format.

thoughts: Array of _id values referencing the Thought model.

friends: Array of _id values referencing the User model (self-reference).

Virtual: friendCount - Retrieves the length of the user's friends array.

Thought
thoughtText: String, Required, 1-280 characters.

createdAt: Date, Defaults to current timestamp, Formatted on query.

username: String, Required (user who created the thought).

reactions: Array of nested documents using the reactionSchema.

Virtual: reactionCount - Retrieves the length of the thought's reactions array.

Reaction (Subdocument Schema)
reactionId: Mongoose ObjectId, Defaults to new ObjectId.

reactionBody: String, Required, 280 character maximum.

username: String, Required.

createdAt: Date, Defaults to current timestamp, Formatted on query.

# Walkthrough Video

A walkthrough video demonstrating the functionality of the API is available here. The video covers:

Starting the server and syncing Mongoose models.

Testing all API routes in Insomnia.

Demonstrating CRUD operations for users, thoughts, friends, and reactions.

# Technologies Used
Express.js: For routing and handling HTTP requests.

MongoDB: NoSQL database for storing unstructured data.

Mongoose: ODM for MongoDB to define models and schemas.

JavaScript Date Object: For formatting timestamps.

# License
This project is licensed under the MIT License. See the LICENSE file for details.