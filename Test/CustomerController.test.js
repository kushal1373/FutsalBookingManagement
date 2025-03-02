const Customer = require('../model/Customer');
const { findAll, save, findById, deleteById, update } = require('../controller/CustomerController');

jest.mock('../model/Customer');

describe('Customer Controller', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        // Create mock request and response objects
        req = {
            params: { id: '123' },
            body: { name: 'John Doe', email: 'john@example.com' }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // ✨ This is the missing piece — manually mock these methods
        Customer.find = jest.fn();
        Customer.findById = jest.fn();
        Customer.findByIdAndDelete = jest.fn();
        Customer.findByIdAndUpdate = jest.fn();
    });

    describe('findAll', () => {
        it('should return all customers', async () => {
            const mockCustomers = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
            Customer.find.mockResolvedValue(mockCustomers);

            await findAll(req, res);

            expect(Customer.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCustomers);
        });
    });

    describe('findById', () => {
        it('should return customer by ID', async () => {
            const mockCustomer = { _id: '123', name: 'John Doe' };
            Customer.findById.mockResolvedValue(mockCustomer);

            await findById(req, res);

            expect(Customer.findById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCustomer);
        });

        it('should handle error', async () => {
            const error = new Error('FindById error');
            Customer.findById.mockRejectedValue(error);

            await findById(req, res);

            expect(res.json).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteById', () => {
        it('should delete customer and return success message', async () => {
            Customer.findByIdAndDelete.mockResolvedValue({});

            await deleteById(req, res);

            expect(Customer.findByIdAndDelete).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith("Data is Deleted");
        });

        it('should handle error', async () => {
            const error = new Error('Delete error');
            Customer.findByIdAndDelete.mockRejectedValue(error);

            await deleteById(req, res);

            expect(res.json).toHaveBeenCalledWith(error);
        });
    });

    describe('update', () => {
        it('should update and return updated customer', async () => {
            const mockUpdatedCustomer = { _id: '123', name: 'Updated John Doe' };
            Customer.findByIdAndUpdate.mockResolvedValue(mockUpdatedCustomer);

            await update(req, res);

            expect(Customer.findByIdAndUpdate).toHaveBeenCalledWith('123', req.body, { new: true });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockUpdatedCustomer);
        });

        it('should handle error', async () => {
            const error = new Error('Update error');
            Customer.findByIdAndUpdate.mockRejectedValue(error);

            await update(req, res);

            expect(res.json).toHaveBeenCalledWith(error);
        });
    });
});
