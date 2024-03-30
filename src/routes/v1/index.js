const express = require('express');
const router = express.Router();

const bookingController = require('../../controller/booking-controller');

router.post('/bookings', bookingController.create);

module.exports = router;