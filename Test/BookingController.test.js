const Booking = require('../model/Booking');
const { findAll, save, deleteBooking } = require('../controller/BookingController');

jest.mock('../model/Booking');

describe('Booking Controller', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            params: { id: '123' },
            body: {
                customerId: 'customer123',
                groundId: 'ground123',
                date: '2025-03-02'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Manually mock all static methods (important for Mongoose models)
        Booking.find = jest.fn();
        Booking.findByIdAndDelete = jest.fn();
        Booking.prototype.save = jest.fn();
    });

    describe('findAll', () => {
        it('should return all bookings', async () => {
            const mockBookings = [
                { _id: '1', customerId: 'customer1', groundId: 'ground1' },
                { _id: '2', customerId: 'customer2', groundId: 'ground2' }
            ];
            Booking.find.mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockBookings)
            });

            await findAll(req, res);

            expect(Booking.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockBookings);
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            Booking.find.mockReturnValue({
                populate: jest.fn().mockRejectedValue(error)
            });

            await findAll(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Failed to fetch bookings",
                details: error
            });
        });
    });

    describe('save', () => {
        it('should save and return the new booking', async () => {
            const mockBooking = { _id: '123', ...req.body };
            Booking.prototype.save.mockResolvedValue(mockBooking);

            await save(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockBooking);
        });

        it('should handle errors', async () => {
            const error = new Error('Save error');
            Booking.prototype.save.mockRejectedValue(error);

            await save(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Failed to save booking",
                details: error
            });
        });
    });

    describe('deleteBooking', () => {
        it('should delete a booking and return success message', async () => {
            const mockDeletedBooking = { _id: '123', ...req.body };
            Booking.findByIdAndDelete.mockResolvedValue(mockDeletedBooking);

            await deleteBooking(req, res);

            expect(Booking.findByIdAndDelete).toHaveBeenCalledWith('123');
            expect(res.json).toHaveBeenCalledWith({
                message: "Booking deleted successfully",
                booking: mockDeletedBooking
            });
        });

        it('should return 404 if booking not found', async () => {
            Booking.findByIdAndDelete.mockResolvedValue(null);

            await deleteBooking(req, res);

            expect(Booking.findByIdAndDelete).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                error: "Booking not found"
            });
        });

        it('should handle errors', async () => {
            const error = new Error('Delete error');
            Booking.findByIdAndDelete.mockRejectedValue(error);

            await deleteBooking(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Server error",
                details: error
            });
        });
    });
});
