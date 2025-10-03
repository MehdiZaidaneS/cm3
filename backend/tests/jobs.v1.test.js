const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");

const jobs = [
  {
    title: "Senior React Developer",
    type: "Full-Time",
    description:
      "We are seeking a talented Front-End Developer to join our team in Boston, MA.",
    company: {
      name: "NewTek Solutions",
      contactEmail: "contact@teksolutions.com",
      contactPhone: "555-555-5555",
    },
    location: "Boston, MA",
    salary: 95000,
    experienceLevel: "Senior",
    requirements: ["React", "JavaScript", "TypeScript"],
  },
  {
    title: "Junior Backend Developer",
    type: "Part-Time",
    description: "Join our backend team to help build scalable APIs.",
    company: {
      name: "Tech Innovators",
      contactEmail: "hr@techinnovators.com",
      contactPhone: "555-555-1234",
    },
    location: "Remote",
    salary: 60000,
    experienceLevel: "Entry",
    requirements: ["Node.js", "Express", "MongoDB"],
  },
];

describe("Job Controller - API V1)"),
  () => {
    beforeEach(async () => {
      await Job.deleteMany({});
      await Job.insertMany(jobs);
    });

    afterAll(() => {
      mongoose.connection.close();
    });

    // Test GET /api/jobs
    it("should return all jobs as JSON when GET /api/jobs is called", async () => {
      const response = await api
        .get("/api/jobs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveLength(jobs.length);
    });

    it("should return 401 when POST /api/jobs is called without authentication", async () => {
      const newJob = {
        title: "Mid-Level DevOps Engineer",
        type: "Full-Time",
        description: "We are looking for a DevOps Engineer to join our team.",
        company: {
          name: "Cloud Solutions",
          contactEmail: "jobs@cloudsolutions.com",
          contactPhone: "555-555-6789",
        },
        location: "New York, NY",
        salary: 85000,
        experienceLevel: "Mid",
        requirements: ["Docker", "Kubernetes", "AWS"],
      };

      await api.post("/api/jobs").send(newJob).expect(401);
    });

    // Test PUT /api/jobs/:id - Should fail without authentication
    it("should return 401 when PUT /api/jobs/:id is called without authentication", async () => {
      const job = await Job.findOne();
      const updatedJob = {
        description: "Updated description",
        type: "Contract",
      };

      await api.put(`/api/jobs/${job._id}`).send(updatedJob).expect(401);
    });

    // Test DELETE /api/jobs/:id - Should fail without authentication
    it("should return 401 when DELETE /api/jobs/:id is called without authentication", async () => {
      const job = await Job.findOne();
      await api.delete(`/api/jobs/${job._id}`).expect(401);
    });
  };
