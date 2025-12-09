import { useEffect, useState } from "react";
import api from "../services/api";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await api.get("/jobs/my");
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  const fetchApplicants = async (jobId) => {
    const res = await api.get(`/recruiter/applicants/${jobId}`);
    setApplications(res.data);
  };

  return (
    <div>
      <h2>My Jobs</h2>

      {jobs.map((job) => (
        <div key={job._id}>
          <h4>{job.title}</h4>
          <p>{job.location}</p>

          <button onClick={() => fetchApplicants(job._id)}>
            View Applicants
          </button>

          <hr />
        </div>
      ))}

      {applications.length > 0 && (
        <>
          <h2>Applicants</h2>

          {applications.map((app) => (
            <div key={app._id}>
              <p>
                <strong>Name:</strong> {app.student.name}
              </p>
              <p>
                <strong>Email:</strong> {app.student.email}
              </p>
              <p>
                <strong>Status:</strong> {app.status}
              </p>

              <a
                href={`http://localhost:5000/${app.resume}`}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>

              <hr />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
