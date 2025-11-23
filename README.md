
# StudyNotion - A Full-Stack Learning Management System

StudyNotion is a modern, fully-featured web application built using the MERN stack. It is a robust and scalable Learning Management System (LMS) that enables instructors to create and manage courses while providing students with a seamless platform to purchase and consume educational content.



----------

## Key Features

### For Students

-   Secure signup and login with OTP verification and password encryption
    
-   Browse and filter a wide range of courses
    
-   View course details, curriculum, and instructor information
    
-   Add multiple courses to a shopping cart
    
-   Smooth and secure checkout with Razorpay
    
-   Personalized dashboard for enrolled courses and profile management
    
-   Interactive course player with progress tracking
    
-   Submit ratings and reviews for enrolled courses
    

### For Instructors

-   Dedicated dashboard to manage courses and analytics
    
-   Multi-step course creation workflow
    
-   Curriculum builder for sections and lectures
    
-   High-quality media upload using Cloudinary
    
-   Edit, update, and publish courses
    
-   Track revenue, enrollments, and performance metrics
    


----------

## Tech Stack and Architecture

This project follows a decoupled client-server architecture.

### Frontend

Technology

Description

React.js

Frontend UI library

Redux Toolkit

State management

React Router

Client-side routing

Tailwind CSS

Utility-first styling

Vite

Frontend build tool

Axios

HTTP client

Razorpay Checkout

Payment gateway integration

### Backend

Technology

Description

Node.js

JavaScript runtime

Express.js

Backend web framework

Mongoose

ODM for MongoDB

JWT

Authentication and authorization

Cloudinary

Media storage and delivery

Nodemailer

Email automation

bcrypt

Password hashing

### Database

Technology

Description

MongoDB

NoSQL primary data store

----------

## Getting Started

Follow the steps below to run the project locally.

### Prerequisites

-   Node.js (v18 or higher)
    
-   MongoDB (local or cloud instance)
    

----------

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/FSD-LMS.git
cd FSD-LMS

```

----------

## 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev

```

The backend will run on the port defined in your `.env` file (default: [http://localhost:4000](http://localhost:4000/)).

----------

## 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev

```

The frontend will typically run at:  
[http://localhost:5173](http://localhost:5173/)

----------

## Environment Variables

### Backend (.env)

```
PORT=4000

MONGODB_URL="mongodb://127.0.0.1:27017/StudyNotion"

JWT_SECRET="your-super-secret-jwt-key"

CLOUD_NAME="your-cloudinary-cloud-name"
CLOUD_API_KEY="your-cloudinary-api-key"
CLOUD_API_SECRET="your-cloudinary-api-secret"

RAZORPAY_KEY="your-razorpay-key-id"
RAZORPAY_SECRET="your-razorpay-key-secret"

MAIL_HOST="smtp.gmail.com"
MAIL_USER="your-email@gmail.com"
MAIL_PASS="your-email-app-password"

```

### Frontend (.env)

```
VITE_APP_BASE_URL="http://localhost:4000/api/v1"

```

----------

## API Endpoints

Method

Endpoint

Description

POST

/auth/signup

Register a new user

POST

/auth/login

Login user and receive JWT

GET

/course/getAllCourses

Retrieve all published courses

POST

/course/getCourseDetails

Retrieve detailed course information

POST

/course/createCourse

Instructor creates a new course

POST

/payment/capturePayment

Student creates Razorpay order

POST

/payment/verifyPayment

Student verifies payment and enrolls

POST

/course/updateCourseProgress

Mark a lecture as complete

----------

## Contributing

Contributions are welcome. Follow these steps:

1.  Fork the repository
    
2.  Create a new feature branch:  
    `git checkout -b feature/AmazingFeature`
    
3.  Commit your changes:  
    `git commit -m "Add AmazingFeature"`
    
4.  Push your branch:  
    `git push origin feature/AmazingFeature`
    
5.  Open a pull request
    

----------

## License

This project is licensed under the MIT License.  
See the `LICENSE` file for more details.

