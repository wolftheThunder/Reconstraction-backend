const express = require("express");
const { 
  getAllServices, 
  getServiceById,
  createService, 
  updateService,
  deleteService 
} = require("../controllers/serviceController");
const upload = require("../config/multer");

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", upload.fields([
  { name: "beforeImage", maxCount: 1 }, 
  { name: "afterImage", maxCount: 1 }
]), createService);
router.put("/:id", upload.fields([
  { name: "beforeImage", maxCount: 1 }, 
  { name: "afterImage", maxCount: 1 }
]), updateService);
router.delete("/:id", deleteService);

module.exports = router;