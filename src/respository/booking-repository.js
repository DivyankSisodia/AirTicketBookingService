const { AppError, ValidationError } = require('../utils/errors/index');
const { Booking } = require('../models/index')
const { StatusCodes } = require('http-status-codes');

class BookingRepository {
    async create() {
        try {
            const booking = await Booking.create();
            return booking;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError
            }
            throw new AppError(
                'RepositoryError',
                'cannot create booking',
                'there was an error while creating booking',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async update(){
        try {
            
        } catch (error) {
            
        }
    }

}

module.exports = BookingRepository;