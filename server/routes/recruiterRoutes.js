const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { isRecruiter } = require("../middleware/roleMiddleware");
const {
    getApplicants,
    updateStatus
} = require("../controllers/recruiterController");

router.get("/applicants/:jobId", auth, isRecruiter, getApplicants);
router.put("/status/:id", auth, isRecruiter, updateStatus);

module.exports = router;