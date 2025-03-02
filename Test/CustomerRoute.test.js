const express = require('express');
const request = require('supertest');
const customerRouter = require('../routes/CustomerRoute');

// Mock the controller functions
jest.mock('../controller/CustomerController', () => ({
    findAll: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
    deleteById: jest.fn(),
    update: jest.fn()
}));

// Mock the validation middleware (if it's in a separate file)
jest.mock('../validation/CustomerValidation', () => (req, res, next) => next());

const {
    findAll,
    save,
    findById,
    deleteById,
    update
} = require('../controller/CustomerController');

// Set up an express app for testing
const app = express();
app.use(express.json());
app.use('/api/customers', customerRouter);

describe('Customer Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/customers/', () => {
        it('should call findAll', async () => {
            findAll.mockImplementation((req, res) => res.status(200).json({ message: 'findAll called' }));

            const response = await request(app).get('/api/customers/');

            expect(findAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'findAll called' });
        });
    });

    describe('POST /api/customers/', () => {
        it('should call save', async () => {
            save.mockImplementation((req, res) => res.status(201).json({ message: 'save called' }));

            const response = await request(app).post('/api/customers/').send({ name: 'John Doe' });

            expect(save).toHaveBeenCalled();
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: 'save called' });
        });
    });

    describe('GET /api/customers/:id', () => {
        it('should call findById', async () => {
            findById.mockImplementation((req, res) => res.status(200).json({ message: 'findById called', id: req.params.id }));

            const response = await request(app).get('/api/customers/123');

            expect(findById).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'findById called', id: '123' });
        });
    });

    describe('DELETE /api/customers/:id', () => {
        it('should call deleteById', async () => {
            deleteById.mockImplementation((req, res) => res.status(200).json({ message: 'deleteById called', id: req.params.id }));

            const response = await request(app).delete('/api/customers/123');

            expect(deleteById).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'deleteById called', id: '123' });
        });
    });

    describe('PUT /api/customers/:id', () => {
        it('should call update', async () => {
            update.mockImplementation((req, res) => res.status(200).json({ message: 'update called', id: req.params.id }));

            const response = await request(app).put('/api/customers/123').send({ name: 'Updated Name' });

            expect(update).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'update called', id: '123' });
        });
    });
});
