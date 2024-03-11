var express = require("express");
const authController = require('../controller/auth')
var router = express.Router();
router.post("/register", authController.register )
router.post("/login", authController.login )


router.post("/updateprofile", authController.updateprofile )

router.post("/list", authController.list )


router.post("/search", authController.search )


router.post("/filter", authController.filter)

router.post("/book", authController.book)

router.post("/reservations", authController.reservations)

router.post("/bookings", authController.bookings)

router.post("/reject", authController.reject)
module.exports = router;