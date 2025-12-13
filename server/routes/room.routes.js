const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const roomController = require("../controllers/room.controller");
const upload = require("../middleware/multer")("upload");
const download = require("../controllers/csv");
// const uploadMiddleware = require("./uploadMiddleware");

router.put("/checkOut", roomController.checkoutRoom);
router.post("/add", roomController.createRoom);
router.delete("/delete/:roomId", roomController.deleteRoom);
router.put("/cancel/:roomNumber", roomController.cancelRoom);
router.post("/bookroom", upload.single("image"), roomController.bookRoom);
router.get("/getall", roomController.getAllRooms);
router.get("/bookings", roomController.getAllBookings);
router.post("/csvFile", download.downloadFile);
router.get("/:roomNumber/booked-data", roomController.getBookedRoomData);
router.get("/pdfFile", download.downloadPDFFile);

module.exports = router;
