const { BookingRepository } = require("../repository/index")

const axios = require('axios');
const { ServiceError } = require("../utils/errors");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository()
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestUrl = `${process.env.FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestUrl);
            const flightData = response.data.data;
            let priceOfFlight = flightData.price;

            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError("Something went wrong in booking process", "Seats not available");
            }
            // console.log(flightData);
            const totalCost = priceOfFlight * data.noOfSeats;
            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestURL = `${process.env.FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
            await axios.patch(updateFlightRequestURL, { totalSeats: flightData.totalSeats - booking.noOfSeats });
            console.log("seats", flightData.totalSeats - booking.noOfSeats);
            const finalBooking = await this.bookingRepository.update(booking.id, { status: "Booked" });
            return finalBooking;

        } catch (error) {
            console.log(error);
            if (error.name == 'RepositoryError') {
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;