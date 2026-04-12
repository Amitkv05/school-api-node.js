# school-api-node.js
Only for Hosting the server

# School Management API

A Node.js + Express.js REST API to manage school data.  
It allows adding new schools and retrieving schools sorted by proximity using geographical distance.

## Features

- Add new schools with validation
- Fetch schools sorted by distance
- Uses Haversine formula for distance calculation
- RESTful API design
- MySQL database integration
- Deployed on cloud

## Tech Stack

- Node.js
- Express.js
- MySQL
- dotenv
- Hosted on Render

- ## API Endpoints

### ➤ Add School
POST /addSchool

Request Body:
{
  "name": "ABC School",
  "address": "Delhi",
  "latitude": 28.6139,
  "longitude": 77.2090
}

---

### ➤ List Schools
GET /listSchools?latitude=28.61&longitude=77.20

Response:
[
  {
    "id": 1,
    "name": "ABC School",
    "distance": 2.5
  }
]

## Live API

https://school-api-node-js.onrender.com

## Installation

git clone https://github.com/Amitkv05/school-api-node.js
cd school-api-node.js
npm install

## Environment Variables

Create a .env file:

DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
DB_PORT=3306
PORT=1000

## Run Project

node index.js

## Distance Calculation

The API uses the Haversine formula to calculate the distance between user location and school coordinates.

## Postman Collection

https://www.postman.com/warped-firefly-10459/workspace/schoolapitesting/collection/37454278-42fe32aa-460e-44dc-b6f4-c80ce6733749?action=share&source=copy-link&creator=37454278
