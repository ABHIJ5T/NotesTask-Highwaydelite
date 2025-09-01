NotesApp - A Full-Stack Notes Application
Hey there! Welcome to the repository for this full-stack notes application. I built this project to create a simple, fast, and good-looking place to jot down thoughts. 
It's built from the ground up with a modern tech stack (React, Node.js, MongoDB, and TypeScript) and is designed to work beautifully whether you're on your laptop or your phone.



What Can It Do? (Features)
Secure User Accounts: Simple and secure signup and login so your notes stay private.

Full Note Management: A clean dashboard where you can create, view, and delete your notes instantly.

Beautifully Responsive: The layout seamlessly adapts from a multi-column desktop view to a single-column mobile experience.

Built with Modern Tools: A fast, reliable, and scalable foundation using today's best web technologies.

Getting It Running On Your Machine
Want to run the project locally? It only takes a few steps.

1. First, the basics:
Make sure you have a few things installed on your computer:

Node.js (I used version 18 or newer)

MongoDB (You can run it locally or grab a free database from MongoDB Atlas)

Git

2. Clone the project and install everything:
This is where the magic of the monorepo comes in. One command installs everything for both the client and server.

# Clone the repository to your machine
git clone [https://github.com/ABHIJ5T/NotesTask-Highwaydelite.git](https://github.com/ABHIJ5T/NotesTask-Highwaydelite.git)

# Go into your new project folder
cd NotesTask-Highwaydelite

# This master command installs all dependencies for the entire project
npm run install:all

3. Set up your server's secrets:
The server needs a couple of secret keys to connect to the database and handle logins securely.

Go into the /server folder.

Create a new file and name it .env.

Copy and paste the following, adding your own database link and a random password for the JWT secret.

# Your MongoDB connection string (from your local setup or MongoDB Atlas)
MONGO_URI=mongodb+srv://your_user:your_password@your_cluster.mongodb.net/notes_db

# This can be any random, strong password you want to create
JWT_SECRET=THIS_IS_MY_SUPER_SECRET_PASSWORD_123!

4. Launch it!
Head back to the main project folder and run the dev command. This will start up the backend server and the frontend app at the same time.

# Make sure you are in the root 'NotesTask-Highwaydelite' folder
npm run dev
