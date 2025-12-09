import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/student/jobs");
        setJobs(res.data);
      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
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
      alert("Already applied to this job");
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />

      <div>
        <h2>Available Jobs</h2>

        {/* Resume upload */}
        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
        />

        {jobs.length === 0 && <p>No jobs available</p>}

        {jobs.map((job) => (
          <div key={job._id}>
            <h4>{job.title}</h4>
            <p>{job.location}</p>
            <button onClick={() => applyJob(job._id)}>
              Apply
            </button>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
