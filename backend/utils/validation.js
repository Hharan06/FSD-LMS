// Validation utility with regex patterns for form validation

// Regex patterns
const REGEX_PATTERNS = {
    // Email validation - standard email format
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    
    // Password validation - at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    
    // Name validation - only letters, spaces, hyphens, and apostrophes, 2-50 characters
    name: /^[a-zA-Z\s\-']{2,50}$/,
    
    // Contact number validation - 10 digits, optional country code
    contactNumber: /^(\+\d{1,3}[- ]?)?\d{10}$/,
    
    // OTP validation - 6 digits
    otp: /^\d{6}$/
};

// Validation functions
const validateEmail = (email) => {
    if (!email) {
        return { isValid: false, message: 'Email is required' };
    }
    if (!REGEX_PATTERNS.email.test(email)) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    return { isValid: true, message: '' };
};

const validatePassword = (password) => {
    if (!password) {
        return { isValid: false, message: 'Password is required' };
    }
    if (password.length < 8) {
        return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!REGEX_PATTERNS.password.test(password)) {
        return { 
            isValid: false, 
            message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&)' 
        };
    }
    return { isValid: true, message: '' };
};

const validateName = (name, fieldName = 'Name') => {
    if (!name) {
        return { isValid: false, message: `${fieldName} is required` };
    }
    if (!REGEX_PATTERNS.name.test(name)) {
        return { 
            isValid: false, 
            message: `${fieldName} must contain only letters, spaces, hyphens, and apostrophes (2-50 characters)` 
        };
    }
    return { isValid: true, message: '' };
};

const validateContactNumber = (contactNumber) => {
    if (!contactNumber) {
        return { isValid: true, message: '' }; // Contact number is optional
    }
    if (!REGEX_PATTERNS.contactNumber.test(contactNumber)) {
        return { isValid: false, message: 'Please enter a valid contact number (10 digits)' };
    }
    return { isValid: true, message: '' };
};

const validateOTP = (otp) => {
    if (!otp) {
        return { isValid: false, message: 'OTP is required' };
    }
    if (!REGEX_PATTERNS.otp.test(otp)) {
        return { isValid: false, message: 'OTP must be 6 digits' };
    }
    return { isValid: true, message: '' };
};

// Comprehensive validation for signup
const validateSignupData = (data) => {
    const errors = {};
    
    const firstNameValidation = validateName(data.firstName, 'First name');
    if (!firstNameValidation.isValid) {
        errors.firstName = firstNameValidation.message;
    }
    
    const lastNameValidation = validateName(data.lastName, 'Last name');
    if (!lastNameValidation.isValid) {
        errors.lastName = lastNameValidation.message;
    }
    
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
        errors.email = emailValidation.message;
    }
    
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
        errors.password = passwordValidation.message;
    }
    
    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    const contactValidation = validateContactNumber(data.contactNumber);
    if (!contactValidation.isValid) {
        errors.contactNumber = contactValidation.message;
    }
    
    const otpValidation = validateOTP(data.otp);
    if (!otpValidation.isValid) {
        errors.otp = otpValidation.message;
    }
    
    if (!data.accountType || !['Student', 'Instructor'].includes(data.accountType)) {
        errors.accountType = 'Please select a valid account type';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Comprehensive validation for login
const validateLoginData = (data) => {
    const errors = {};
    
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
        errors.email = emailValidation.message;
    }
    
    if (!data.password) {
        errors.password = 'Password is required';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

// Validation for change password
const validateChangePasswordData = (data) => {
    const errors = {};
    
    if (!data.oldPassword) {
        errors.oldPassword = 'Current password is required';
    }
    
    const newPasswordValidation = validatePassword(data.newPassword);
    if (!newPasswordValidation.isValid) {
        errors.newPassword = newPasswordValidation.message;
    }
    
    if (data.newPassword !== data.confirmNewPassword) {
        errors.confirmNewPassword = 'Passwords do not match';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    REGEX_PATTERNS,
    validateEmail,
    validatePassword,
    validateName,
    validateContactNumber,
    validateOTP,
    validateSignupData,
    validateLoginData,
    validateChangePasswordData
};
