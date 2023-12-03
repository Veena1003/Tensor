# Customer Service Platform

##Video Demo




https://github.com/Veena1003/Tensor/assets/107175584/33fa1249-bbc6-4cf0-9ea5-68f6a26c8b82

This project is a customer service platform built with Node.js for the backend and React for the frontend. It allows users to log in using Google OAuth, submit customer service requests, and interact with customer service through Intercom.com.

## Backend Microservice (Node.js)

### API Endpoints

#### User Authentication
- **Endpoint**: `/api/auth/google`
- **Description**: Enables users to log in using Google OAuth.

#### Customer Service Interaction
- **Endpoint**: `/api/customer-service`
- **Description**: Allows users to submit customer service requests, including the category and additional comments.

#### Data Retrieval
- **Endpoint**: `/api/customer-service/:category`
- **Description**: Retrieves and displays customer service requests for a specific category.

### Third-Party Integration
- Integrated Intercom.com to handle customer service requests.
- Ensured that customer service interactions through the platform are reflected on Intercom.com.

## Frontend (React)

### Features

#### Google OAuth Integration
- Implemented a user interface for users to log in using their Google accounts.

#### Customer Service Form
- Created a form for users to submit customer service requests, with options to select the category and provide additional comments.

#### Display Customer Service Requests
- Shows customer service requests for each category in a user-friendly manner.

## Getting Started

### Prerequisites
- Node.js and npm installed.

### Installation

1. Clone the repository: `git clone https://github.com/yourusername/customer-service-platform.git`
2. Navigate to the project directory: `cd TensorGo`
3. Install dependencies for both backend and frontend: 
   ```bash
   cd server
   npm install
   node index.js
   
   cd ..
   npm install
   npm run dev
