const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

// Debug route to check JWT_SECRET and token verification
router.get('/jwt-debug', (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        console.log('=== JWT DEBUG INFO ===');
        console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
        console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length);
        console.log('JWT_SECRET first 10 chars:', process.env.JWT_SECRET?.substring(0, 10));
        console.log('JWT_SECRET last 10 chars:', process.env.JWT_SECRET?.substring(-10));
        console.log('Expected JWT_SECRET:', 'b2V6q9N4rZt3fLp8Yx1sQmVv7uWnC0aHkP6t3F2yZ0=');
        console.log('Secrets match:', process.env.JWT_SECRET === 'b2V6q9N4rZt3fLp8Yx1sQmVv7uWnC0aHkP6t3F2yZ0=');
        console.log('Token received:', token?.substring(0, 20) + '...');
        
        if (token) {
            try {
                // Try to decode without verification first
                const decoded = jwt.decode(token);
                console.log('Token decoded (without verification):', decoded);
                
                // Check token structure
                const header = jwt.decode(token, { complete: true });
                console.log('Token header:', header?.header);
                console.log('Token payload:', header?.payload);
                
                // Now try to verify with current secret
                const verified = jwt.verify(token, process.env.JWT_SECRET);
                console.log('Token verified successfully:', verified);
                
                res.json({
                    success: true,
                    message: 'Token verification successful',
                    decoded: verified,
                    jwtSecretLength: process.env.JWT_SECRET?.length,
                    secretsMatch: process.env.JWT_SECRET === 'b2V6q9N4rZt3fLp8Yx1sQmVv7uWnC0aHkP6t3F2yZ0='
                });
            } catch (verifyError) {
                console.log('Token verification failed:', verifyError.message);
                
                // Get decoded token info for debugging
                const decoded = jwt.decode(token);
                const header = jwt.decode(token, { complete: true });
                
                // Try with the expected secret
                try {
                    const verifiedWithExpected = jwt.verify(token, 'b2V6q9N4rZt3fLp8Yx1sQmVv7uWnC0aHkP6t3F2yZ0=');
                    console.log('Token verified with expected secret:', verifiedWithExpected);
                    
                    res.json({
                        success: false,
                        message: 'Token verification failed with current secret but works with expected secret',
                        error: verifyError.message,
                        currentSecretWorks: false,
                        expectedSecretWorks: true,
                        jwtSecretLength: process.env.JWT_SECRET?.length,
                        secretsMatch: process.env.JWT_SECRET === 'b2V6q9N4rZt3fLp8Yx1sQmVv7uWnC0aHkP6t3F2yZ0=',
                        decodedPayload: decoded,
                        tokenHeader: header?.header
                    });
                } catch (expectedError) {
                    res.json({
                        success: false,
                        message: 'Token verification failed with both secrets',
                        currentSecretError: verifyError.message,
                        expectedSecretError: expectedError.message,
                        jwtSecretLength: process.env.JWT_SECRET?.length,
                        secretsMatch: process.env.JWT_SECRET === 'b2V6q9N4rZt3fLp8Yx1sQmVv7uWnC0aHkP6t3F2yZ0=',
                        decodedPayload: decoded,
                        tokenHeader: header?.header,
                        tokenExpiry: decoded?.exp ? new Date(decoded.exp * 1000).toISOString() : null,
                        tokenIssued: decoded?.iat ? new Date(decoded.iat * 1000).toISOString() : null,
                        isTokenExpired: decoded?.exp ? Date.now() > decoded.exp * 1000 : null
                    });
                }
            }
        } else {
            res.json({
                success: false,
                message: 'No token provided',
                jwtSecretLength: process.env.JWT_SECRET?.length,
                secretsMatch: process.env.JWT_SECRET === 'b2V6q9N4rZt3fLp8Yx1sQmVv7uWnC0aHkP6t3F2yZ0='
            });
        }
    } catch (error) {
        console.log('Debug route error:', error);
        res.status(500).json({
            success: false,
            message: 'Debug route error',
            error: error.message
        });
    }
});

// Check courses in database
router.get('/check-courses', async (req, res) => {
    try {
        const Course = require('../models/course');
        
        const courses = await Course.find({})
            .populate('instructor', 'firstName lastName email')
            .exec();
            
        console.log('=== COURSE DEBUG INFO ===');
        console.log('Total courses in DB:', courses.length);
        
        courses.forEach((course, index) => {
            console.log(`Course ${index + 1}:`, {
                name: course.courseName,
                status: course.status,
                instructor: course.instructor?.firstName + ' ' + course.instructor?.lastName,
                createdAt: course.createdAt
            });
        });
        
        res.json({
            success: true,
            message: 'Course debug info',
            totalCourses: courses.length,
            courses: courses.map(c => ({
                id: c._id,
                name: c.courseName,
                status: c.status,
                instructor: c.instructor?.firstName + ' ' + c.instructor?.lastName,
                price: c.price,
                thumbnail: c.thumbnail,
                createdAt: c.createdAt
            }))
        });
    } catch (error) {
        console.log('Course debug error:', error);
        res.status(500).json({
            success: false,
            message: 'Course debug failed',
            error: error.message
        });
    }
});

// Generate a new token for testing
router.post('/generate-token', (req, res) => {
    try {
        const { email, id, accountType } = req.body;
        
        // Use default values if not provided
        const payload = {
            email: email || 'hariharan2210765@ssn.edu.in',
            id: id || '68f7bb3843844bd1d18b94b5',
            accountType: accountType || 'Instructor'
        };
        
        console.log('Generating token with payload:', payload);
        console.log('Using JWT_SECRET:', process.env.JWT_SECRET);
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        
        console.log('Generated token:', token);
        
        res.json({
            success: true,
            message: 'Token generated successfully',
            token: token,
            payload: payload,
            jwtSecretUsed: process.env.JWT_SECRET?.substring(0, 10) + '...'
        });
    } catch (error) {
        console.log('Token generation error:', error);
        res.status(500).json({
            success: false,
            message: 'Token generation failed',
            error: error.message
        });
    }
});

module.exports = router;
