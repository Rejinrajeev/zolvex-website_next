const express = require("express");
const { calculatePrice } = require("../../controllers/priceController");
const validate = require("../../middleware/validate");
const { calculatePriceSchema } = require("../../validators/bookingValidators");

const router = express.Router();

router.post("/price/calculate", validate(calculatePriceSchema), calculatePrice);

module.exports = router;
