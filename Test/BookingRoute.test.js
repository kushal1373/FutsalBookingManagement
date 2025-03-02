const express = require('express');
const request = require('supertest');
const router = require('../routes/BookingRoute');
const Booking = require('../model/Booking');
const { deleteBooking } = require('../controller/BookingController');

jest.mock('../model/Booking');
jest.mock('../controller/BookingController');

const app = express();
app.use(express.json());
app.use('/api/booking', router);

describe('BookingRoute', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/booking/court', () => {
        it('should return booked slots for a court on a given date', async () => {
            const mockBookings = [
                { timeSlot: '10:00-11:00' },
                { timeSlot: '11:00-12:00' }
            ];
            Booking.find.mockResolvedValue(mockBookings);

            const response = await request(app).get('/api/booking/court?courtName=CourtA&date=2025-03-02');

            expect(Booking.find).toHaveBeenCalledWith({
                courtName: 'CourtA',
                dateTime: expect.objectContaining({ $gte: expect.any(Date), $lte: expect.any(Date) })
            });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ bookedSlots: ['10:00-11:00', '11:00-12:00'] });
        });

        it('should handle server error', async () => {
            Booking.find.mockRejectedValue(new Error('DB error'));

            const response = await request(app).get('/api/booking/court?courtName=CourtA&date=2025-03-02');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Server error" });
        });
    });

    describe('GET /api/booking/user/:userId', () => {
        it('should return bookings for a user', async () => {
            const mockBookings = [
                { courtName: 'CourtA', dateTime: new Date(), timeSlot: '10:00-11:00' }
            ];
            Booking.find.mockResolvedValue(mockBookings);

            const response = await request(app).get('/api/booking/user/user123');

            expect(Booking.find).toHaveBeenCalledWith({ userId: 'user123' });
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ bookings: mockBookings });
        });

        it('should handle server error', async () => {
            Booking.find.mockRejectedValue(new Error('DB error'));

            const response = await request(app).get('/api/booking/user/user123');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Server error" });
        });
    });

    describe('POST /api/booking', () => {
        it('should create a new booking', async () => {
            const mockBooking = {
                _id: '123',
                courtName: 'CourtA',
                dateTime: new Date(),
                timeSlot: '10:00-11:00',
                userId: 'user123',
                status: 'PENDING'
            };
            Booking.prototype.save = jest.fn().mockResolvedValue(mockBooking);

            const response = await request(app).post('/api/booking').send({
                courtName: 'CourtA',
                dateTime: '2025-03-02T10:00:00.000Z',
                timeSlot: '10:00-11:00',
                userId: 'user123'
            });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockBooking);
        });

        it('should handle error when creating booking', async () => {
            Booking.prototype.save.mockRejectedValue(new Error('Save error'));

            const response = await request(app).post('/api/booking').send({
                courtName: 'CourtA',
                dateTime: '2025-03-02T10:00:00.000Z',
                timeSlot: '10:00-11:00',
                userId: 'user123'
            });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "Failed to create booking" });
        });
    });

    describe('DELETE /api/booking/:id', () => {
        it('should call deleteBooking from the controller', async () => {
            deleteBooking.mockImplementation(async (req, res) => {
                res.status(200).json({ message: 'Booking deleted' });
            });

            const response = await request(app).delete('/api/booking/123');

            expect(deleteBooking).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Booking deleted' });
        });
    });
});
