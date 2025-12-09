const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const { isStudent } = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    getAllJobs,
    applyJobWithResume
} = require("../controllers/studentController");

router.get("/jobs", auth, isStudent, getAllJobs);

router.post(
    "/apply/:id",
    auth,
    isStudent,
    upload.single("resume"),
    applyJobWithResume
);

module.exports = router;