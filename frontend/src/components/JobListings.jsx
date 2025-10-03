import { useEffect, useState } from "react";
import JobListing from "./JobListing";

const JobListings = () => {
  const [jobs, setJobs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
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
  }, []);

  return (
    <div className="job-list">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {jobs && jobs.map((job) => (
        <JobListing key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;
