import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const JobDetailsPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteJob = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete job: ${errorText}`);
      }
      console.log("Job deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const onDeleteClick = (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job listing?"
    );
    if (!confirmDelete) return;

    deleteJob(jobId);
  };

  return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : job ? (
        <>
          <h2>{job.title}</h2>
          <p><strong>Type:</strong> {job.type}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> ${job.salary}</p>
          <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
          <p><strong>Status:</strong> {job.status}</p>
          {job.applicationDeadline && (
            <p><strong>Application Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</p>
          )}

          <h3>Company Info</h3>
          <p><strong>Name:</strong> {job.company.name}</p>
          <p><strong>Email:</strong> {job.company.contactEmail}</p>
          <p><strong>Phone:</strong> {job.company.contactPhone}</p>
          {job.company.website && <p><strong>Website:</strong> {job.company.website}</p>}
          {job.company.size && <p><strong>Company Size:</strong> {job.company.size} employees</p>}

          {isAuthenticated && (
            <div style={{ marginTop: "1rem" }}>
              <button onClick={() => onDeleteClick(job.id)}>Delete</button>
              <button onClick={() => navigate(`/jobs/edit/${job.id}`)}>Edit</button>
            </div>
          )}
        </>
      ) : (
        <p>No job details available.</p>
      )}
    </div>
  );
};

export default JobDetailsPage;
