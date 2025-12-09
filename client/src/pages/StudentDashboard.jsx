import { useEffect, useState } from "react";
import api from "../services/api";

export default function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await api.get("/student/jobs");
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  const applyJob = async (jobId) => {
    if (!resume) {
      alert("Please upload resume first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      await api.post(`/student/apply/${jobId}`, formData);
      alert("Applied successfully");
    } catch (err) {
      alert("Already applied");
    }
  };

  return (
    <div>
      <h2>Available Jobs</h2>

      {/* Resume upload ONCE */}
      <input
        type="file"
        onChange={(e) => setResume(e.target.files[0])}
      />

      {jobs.map((job) => (
        <div key={job._id}>
          <h4>{job.title}</h4>
          <p>{job.location}</p>
          <button onClick={() => applyJob(job._id)}>Apply</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
