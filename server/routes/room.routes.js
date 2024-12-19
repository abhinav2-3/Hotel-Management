const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const roomController = require("../controllers/room.controller");
const upload = require("../middleware/multer")("upload");
// const uploadMiddleware = require("./uploadMiddleware");
router.put('/checkOut',roomController.checkoutRoom );
router.post("/add", roomController.createRoom);
router.delete("/delete/:roomId", roomController.deleteRoom);
router.put("/cancel/:roomNumber", roomController.cancelRoom);
router.post("/bookroom", upload.single("image"), roomController.bookRoom);
router.get("/getall", roomController.getAllRooms);
router.get("/bookings", roomController.getAllBookings);

module.exports = router;

