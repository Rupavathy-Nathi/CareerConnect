const Application = require("../models/Application");

exports.getApplicants = async(req, res) => {
    const jobId = req.params.jobId;

    const applications = await Application.find({ job: jobId })
        .populate("student", "name email");

    res.json(applications);
};

exports.updateStatus = async(req, res) => {
    const { status } = req.body;

    await Application.findByIdAndUpdate(req.params.id, { status });

    res.json({ message: "Status updated" });
};