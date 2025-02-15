
# Project 1st
## Role-Based Access Control (RBAC) in Node.js using JWT

## Overview

This project implements **Role-Based Access Control (RBAC)** in a **Node.js** application using **JWT (JSON Web Token)**. The `roleAccessMiddleware` ensures that only users with the allowed roles can access specific routes.

## Installation

Make sure you have **Node.js** installed on your system.

1. Clone the repository and navigate to the project folder.
2. Install dependencies using npm.
3. Set up your **.env** file with the required JWT secret.

## Usage

### Middleware Implementation

The `roleAccessMiddleware` function restricts access to routes based on user roles.

### Applying Middleware to Routes

To protect a route, use the `roleAccessMiddleware` and pass the allowed roles.

## Testing the Middleware

To test, generate a JWT token with a role claim and include it in the request headers.

## Conclusion

This implementation allows you to restrict access to routes based on user roles using JWT authentication. Modify the roles as needed for your application's requirements.

### Author

**Nitin Malviya**  
Frontend & Backend Developer
