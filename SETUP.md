# StudyNotion LMS Setup Guide

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## Required Third-Party Services

You'll need to create accounts and obtain API keys for:

1. **MongoDB Atlas** (or local MongoDB)
2. **Cloudinary** (for file storage)
3. **Razorpay** (for payment processing)
4. **Email Service** (Gmail recommended)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd Study-Notion-LMS-main

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Backend Environment Setup

1. Navigate to the `backend` directory
2. Copy `.env.sample` to `.env`:
   ```bash
   cp .env.sample .env
   ```
3. Fill in all the required environment variables in `.env`:

#### Database Configuration
- **DATABASE_URL**: Your MongoDB connection string
  - Local: `mongodb://localhost:27017/studynotion`
  - Atlas: `mongodb+srv://<username>:<password>@cluster.mongodb.net/studynotion`

#### JWT Configuration
- **JWT_SECRET**: A strong, random secret key for JWT tokens

#### Cloudinary Configuration
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your credentials from the dashboard:
   - **CLOUD_NAME**: Your cloud name
   - **API_KEY**: Your API key
   - **API_SECRET**: Your API secret
   - **FOLDER_NAME**: Set to "StudyNotion" or your preferred folder name

#### Razorpay Configuration
1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your credentials from the dashboard:
   - **RAZORPAY_KEY**: Your key ID
   - **RAZORPAY_SECRET**: Your secret key

#### Email Configuration
For Gmail:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Use these credentials:
   - **MAIL_HOST**: `smtp.gmail.com`
   - **MAIL_USER**: Your Gmail address
   - **MAIL_PASS**: Your App Password (not your regular password)

### 3. Frontend Environment Setup

1. Navigate to the `frontend` directory
2. Copy `.env.sample` to `.env`:
   ```bash
   cp .env.sample .env
   ```
3. Fill in the environment variables:
   - **VITE_APP_BASE_URL**: Your backend URL (default: `http://localhost:5000/api/v1`)
   - **VITE_APP_RAZORPAY_KEY**: Same as RAZORPAY_KEY from backend

### 4. Database Setup

If using local MongoDB:
```bash
# Start MongoDB service
mongod
```

If using MongoDB Atlas:
- Create a new cluster
- Create a database user
- Whitelist your IP address
- Get the connection string

### 5. Running the Application

#### Start Backend Server
```bash
cd backend
npm run dev
# Server will start on http://localhost:5000
```

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
# Frontend will start on http://localhost:5173
```

### 6. Testing the Setup

1. Open your browser and go to `http://localhost:5173`
2. Try creating a new account
3. Check if email verification works
4. Test file upload functionality
5. Test payment integration (use Razorpay test credentials)

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your DATABASE_URL
   - Ensure MongoDB is running (if local)
   - Check network access in MongoDB Atlas

2. **Email Not Sending**
   - Verify MAIL_HOST, MAIL_USER, and MAIL_PASS
   - Check if 2FA is enabled and App Password is used

3. **File Upload Issues**
   - Verify Cloudinary credentials
   - Check FOLDER_NAME configuration

4. **Payment Issues**
   - Ensure Razorpay keys match in both frontend and backend
   - Use test keys for development

### Environment Variables Checklist

**Backend (.env)**
- [ ] PORT
- [ ] DATABASE_URL
- [ ] JWT_SECRET
- [ ] CLOUD_NAME
- [ ] API_KEY
- [ ] API_SECRET
- [ ] FOLDER_NAME
- [ ] RAZORPAY_KEY
- [ ] RAZORPAY_SECRET
- [ ] MAIL_HOST
- [ ] MAIL_USER
- [ ] MAIL_PASS

**Frontend (.env)**
- [ ] VITE_APP_BASE_URL
- [ ] VITE_APP_RAZORPAY_KEY

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique passwords and secrets
- Regularly rotate API keys and secrets
- Use environment-specific configurations for development, staging, and production

## Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Nodemailer Documentation](https://nodemailer.com/about/)
