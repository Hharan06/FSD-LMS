// Frontend validation utility with regex patterns

// Regex patterns (same as backend for consistency)
export const REGEX_PATTERNS = {
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
export const validateEmail = (email) => {
    if (!email) {
        return { isValid: false, message: 'Email is required' };
    }
    if (!REGEX_PATTERNS.email.test(email)) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    return { isValid: true, message: '' };
};

export const validatePassword = (password) => {
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

export const validateName = (name, fieldName = 'Name') => {
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

export const validateContactNumber = (contactNumber) => {
    if (!contactNumber) {
        return { isValid: true, message: '' }; // Contact number is optional
    }
    if (!REGEX_PATTERNS.contactNumber.test(contactNumber)) {
        return { isValid: false, message: 'Please enter a valid contact number (10 digits)' };
    }
    return { isValid: true, message: '' };
};

export const validateOTP = (otp) => {
    if (!otp) {
        return { isValid: false, message: 'OTP is required' };
    }
    if (!REGEX_PATTERNS.otp.test(otp)) {
        return { isValid: false, message: 'OTP must be 6 digits' };
    }
    return { isValid: true, message: '' };
};

// Password strength indicator
export const getPasswordStrength = (password) => {
    let strength = 0;
    const checks = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*?&]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    const strengthLevels = {
        0: { level: 'Very Weak', color: 'text-red-500', width: '0%' },
        1: { level: 'Very Weak', color: 'text-red-500', width: '20%' },
        2: { level: 'Weak', color: 'text-orange-500', width: '40%' },
        3: { level: 'Fair', color: 'text-yellow-500', width: '60%' },
        4: { level: 'Good', color: 'text-blue-500', width: '80%' },
        5: { level: 'Strong', color: 'text-green-500', width: '100%' }
    };
    
    return {
        ...strengthLevels[strength],
        checks,
        score: strength
    };
};

// Real-time validation for forms
export const validateField = (fieldName, value, confirmValue = null) => {
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            return validateName(value, fieldName === 'firstName' ? 'First name' : 'Last name');
        case 'email':
            return validateEmail(value);
        case 'password':
            return validatePassword(value);
        case 'confirmPassword':
            if (!value) {
                return { isValid: false, message: 'Please confirm your password' };
            }
            if (value !== confirmValue) {
                return { isValid: false, message: 'Passwords do not match' };
            }
            return { isValid: true, message: '' };
        case 'contactNumber':
            return validateContactNumber(value);
        case 'otp':
            return validateOTP(value);
        default:
            return { isValid: true, message: '' };
    }
};
