const express = require('express');
const router = express.Router();

const { capturePayment, verifyPayment, enrollCourseDirectly } = require('../controllers/payments');
const { auth, isAdmin, isInstructor, isStudent } = require('../middleware/auth');

router.post('/capturePayment', auth, isStudent, capturePayment);
router.post('/verifyPayment', auth, isStudent, verifyPayment);
router.post('/enrollDirectly', auth, isStudent, enrollCourseDirectly);

module.exports = router
