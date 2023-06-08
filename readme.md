# Goal Assist

Goal Assist is a MERN (MongoDB, Express.js, React.js, Node.js) application that provides user authentication and authorization features, allowing users to manage their personal goals. It uses JWT (JSON Web Tokens) for authentication and authorization purposes, where each user can only see their own goals.

#### You can access it's frontend [here](https://goal-assist.onrender.com)

#### You can access it's backend [here](https://api-goal-assist.onrender.com):

## Features

- User authentication and authorization
- Goal management and tracking
- Context API with reducers for sharing data across the React app
- Integration of JWT for secure token-based authentication

## Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine
- MongoDB database connection (locally or cloud-based)
- API endpoints provided for authentication and goal management

## Installation

Clone the repository:

```shell
git clone https://github.com/avi-agarwalji/MERN_Goal_Assist.git
```

## Usage

- Sign up for a new account or log in using existing credentials.
- Upon successful authentication, you will be redirected to the dashboard.
- Use the provided interface to create, update, and delete your goals.
- Only the goals associated with your account will be visible.
- The authentication token is stored in the browser's local storage for persistent login.
