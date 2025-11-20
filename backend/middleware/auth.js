// AUTH , IS STUDENT , IS INSTRUCTOR , IS ADMIN

const jwt = require("jsonwebtoken");
require('dotenv').config();


// ================ AUTH ================
// user Authentication by checking token validating
exports.auth = (req, res, next) => {
    try {
        // extract token by anyone from this 3 ways
        let token = req.body?.token || req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
        
        // Remove quotes if present (common issue with token formatting)
        if (token && typeof token === 'string') {
            token = token.replace(/^["']|["']$/g, '');
        }

        // if token is missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is Missing'
            });
        }

        // console.log('Token (cleaned) ==> ', token);
        // console.log('From body -> ', req.body?.token);
        // console.log('from cookies -> ', req.cookies?.token);
        // console.log('from headers -> ', req.header('Authorization')?.replace('Bearer ', ''));
        // console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
        // console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length);

        // verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = decode;
        }
        catch (error) {
            console.log('Error while decoding token');
            console.log('Error name:', error.name);
            console.log('Error message:', error.message);
            console.log('Token received:', token?.substring(0, 20) + '...');
            console.log('Full error:', error);
            
            let errorMessage = 'Error while decoding token';
            if (error.name === 'JsonWebTokenError') {
                errorMessage = 'Invalid token format or signature';
            } else if (error.name === 'TokenExpiredError') {
                errorMessage = 'Token has expired';
            } else if (error.name === 'NotBeforeError') {
                errorMessage = 'Token not active yet';
            }
            
            return res.status(401).json({
                success: false,
                error: error.message,
                errorType: error.name,
                message: errorMessage
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while token validating');
        console.log(error);
        return res.status(500).json({
            success: false,
            messgae: 'Error while token validating'
        })
    }
}





// ================ IS STUDENT ================
exports.isStudent = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user?.accountType != 'Student') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for student'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with student accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with student accountType'
        })
    }
}


// ================ IS INSTRUCTOR ================
exports.isInstructor = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user?.accountType != 'Instructor') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for Instructor'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with Instructor accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with Instructor accountType'
        })
    }
}


// ================ IS ADMIN ================
exports.isAdmin = (req, res, next) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user.accountType != 'Admin') {
            return res.status(401).json({
                success: false,
                messgae: 'This Page is protected only for Admin'
            })
        }
        // go to next middleware
        next();
    }
    catch (error) {
        console.log('Error while cheching user validity with Admin accountType');
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
            messgae: 'Error while cheching user validity with Admin accountType'
        })
    }
}


