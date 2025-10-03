import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  return (
    <div className="job-preview">
      <Link to={`/jobs/${job._id}`}>
        <h2>{job.title}</h2>
      </Link>
      <p><strong>Company:</strong> {job.company?.name}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
    </div>
  );
};

export default JobListing;
