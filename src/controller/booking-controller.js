const { StatusCodes } = require('http-status-codes');
const { BookingService } = require("../services/index");

const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        console.log(response);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Booking created successfully",
            data: response,
            err: {},
        });
    }
    catch (error) {
        return res.status(error.statusCode).json({
            err: error.explanation,
            success: false,
            message: error.message,
            data: {},
        });
    }
}

module.exports = {
    create,
}
