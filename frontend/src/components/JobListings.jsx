import { useEffect, useState } from "react";
import JobListing from "./JobListing";

const JobListings = () => {
  const [jobs, setJobs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // Use environment variable for backend URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/jobs`);
        if (!res.ok) {
          throw new Error("Could not fetch jobs");
        }
        const data = await res.json();
        setIsPending(false);
        setJobs(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };

    fetchJobs();
  }, [API_BASE_URL]);

  return (
    <div className="job-list">
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isPending && <div>Loading...</div>}
      {jobs && jobs.map((job) => (
        <JobListing key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;
