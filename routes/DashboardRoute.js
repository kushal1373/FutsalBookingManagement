// routes/DashboardRoute.js
const express = require("express");
const router = express.Router();
const Court = require("../model/Court");
// Return an object with "courts" array
router.get("/", (req, res) => {
  res.json({
    message: "Dashboard data fetched successfully",
    courts: [
        // for mobile uncommit this
        // { id: 1, name: "Manang Marshyangdi Futsal", imageUrl: "http://10.0.2.2:3000/images/Manangfutsal.jpg"},
        // { id: 2, name: "Samakhushi Futsal", imageUrl: "http://10.0.2.2:3000/images/Samakhushifutsal.jpg" },
        // { id: 3, name: "dhuku Futsal", imageUrl: "http://10.0.2.2:3000/images/dhukufutsal.jpg" },
        // { id: 4, name: "Monaestry Futsal", imageUrl: "http://10.0.2.2:3000/images/monaestryfutsal.jpg" },
        // { id: 5, name: "Prime Futsal", imageUrl: "http://10.0.2.2:3000/images/primefutsal.jpg" }

        // for web
      { id: 1, name: "Manang Marshyangdi Futsal", imageUrl: "http://localhost:3000/images/Manangfutsal.jpg","price":1800, phone : "016200126"},
      { id: 2, name: "Samakhushi Futsal", imageUrl: "http://localhost:3000/images/Samakhushifutsal.jpg", "price": 1400, phone : "01-4963834"},
      { id: 3, name: "dhuku Futsal", imageUrl: "http://localhost:3000/images/dhukufutsal.jpg", "price": 1700, phone :"01-4535832" },
      { id: 4, name: "Monaestry Futsal", imageUrl: "http://localhost:3000/images/monaestryfutsal.jpg", "price":1200, phone :"9808491431" },
      { id: 5, name: "Prime Futsal", imageUrl: "http://localhost:3000/images/primefutsal.jpg", "price": 1100, phone : "9860306492"}



      // etc.
    ]
  });
});

module.exports = router;
