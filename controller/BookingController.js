
const Booking = require("../model/Booking")

const findAll = async (req, res) => {
    try {
        const books = await Booking.find().populate(["customerId","groundId"]);
        res.status(200).json(books);
    } catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const books = new Booking(req.body);
        await books.save();
        res.status(201).json(books)
    } catch (e) {
        res.json(e)
    }
}




module.exports = {
    findAll,
    save
}