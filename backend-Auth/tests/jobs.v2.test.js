const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Job = require("../models/jobModel");
const User = require("../models/userModel");

describe("Job Controller - API V2 (With Authentication)", () => {
  let authToken;

  beforeAll(async () => {
    await Job.deleteMany({});
    await User.deleteMany({});

    const userResponse = await api.post("/api/users/signup").send({
      name: "Test User",
      username: "testuser",
      password: "password123",
      phone_number: "123-456-7890",
      gender: "Male",
      date_of_birth: "1990-01-01",
      membership_status: "active",
      address: "123 Test Street",
    });

    authToken = userResponse.body.token;
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  beforeEach(async () => {
    await Job.deleteMany({});
  });

  // Test POST /api/jobs with authentication
  it("should create a new job when POST /api/jobs is called with valid authentication", async () => {
    const newJob = {
      title: "Full Stack Developer",
      type: "Full-Time",
      description: "Experienced full stack developer needed",
      company: {
        name: "Tech Innovators",
        contactEmail: "hr@techinnovators.com",
        contactPhone: "555-1111",
      },
      location: "Remote",
      salary: 90000,
      experienceLevel: "Mid",
      requirements: ["React", "Node.js", "MongoDB"],
    };

    const response = await api
      .post("/api/jobs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newJob)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.title).toBe("Full Stack Developer");
    expect(response.body.salary).toBe(90000);
  });

  it("should return 401 when POST /api/jobs is called without authentication", async () => {
    const newJob = {
      title: "Backend Developer",
      type: "Full-Time",
      description: "Node.js developer",
      company: {
        name: "StartUp",
        contactEmail: "jobs@startup.com",
        contactPhone: "555-2222",
      },
      location: "New York, NY",
      salary: 80000,
      experienceLevel: "Entry",
      requirements: ["Node.js", "Express"],
    };

    await api.post("/api/jobs").send(newJob).expect(401);
  });

  // Test PUT /api/jobs/:id with authentication
  it("should update a job when PUT /api/jobs/:id is called with valid authentication", async () => {
    const job = await Job.create({
      title: "Software Engineer",
      type: "Full-Time",
      description: "Join our team",
      company: {
        name: "Tech Corp",
        contactEmail: "hr@techcorp.com",
        contactPhone: "555-3333",
      },
      location: "San Francisco, CA",
      salary: 100000,
      experienceLevel: "Mid",
      requirements: ["JavaScript", "React"],
    });

    const updates = {
      salary: 110000,
      status: "closed",
    };

    const response = await api
      .put(`/api/jobs/${job._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updates)
      .expect(200);

    expect(response.body.salary).toBe(110000);
    expect(response.body.status).toBe("closed");
  });

  it("should return 401 when PUT /api/jobs/:id is called without authentication", async () => {
    const job = await Job.create({
      title: "Software Engineer",
      type: "Full-Time",
      description: "Join our team",
      company: {
        name: "Tech Corp",
        contactEmail: "hr@techcorp.com",
        contactPhone: "555-3333",
      },
      location: "San Francisco, CA",
      salary: 100000,
      experienceLevel: "Mid",
      requirements: ["JavaScript", "React"],
    });

    await api.put(`/api/jobs/${job._id}`).send({ salary: 110000 }).expect(401);
  });

  it("should return 404 for non-existent job when PUT /api/jobs/:id is called", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await api
      .put(`/api/jobs/${fakeId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ salary: 110000 })
      .expect(404);
  });

  // Test DELETE /api/jobs/:id with authentication
  it("should delete a job when DELETE /api/jobs/:id is called with valid authentication", async () => {
    const job = await Job.create({
      title: "DevOps Engineer",
      type: "Contract",
      description: "Infrastructure specialist needed",
      company: {
        name: "Cloud Systems",
        contactEmail: "jobs@cloudsystems.com",
        contactPhone: "555-4444",
      },
      location: "Austin, TX",
      salary: 95000,
      experienceLevel: "Senior",
      requirements: ["Docker", "Kubernetes", "AWS"],
    });

    await api
      .delete(`/api/jobs/${job._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(204);

    const deletedJob = await Job.findById(job._id);
    expect(deletedJob).toBeNull();
  });

  it("should return 401 when DELETE /api/jobs/:id is called without authentication", async () => {
    const job = await Job.create({
      title: "DevOps Engineer",
      type: "Contract",
      description: "Infrastructure specialist needed",
      company: {
        name: "Cloud Systems",
        contactEmail: "jobs@cloudsystems.com",
        contactPhone: "555-4444",
      },
      location: "Austin, TX",
      salary: 95000,
      experienceLevel: "Senior",
      requirements: ["Docker", "Kubernetes", "AWS"],
    });

    await api.delete(`/api/jobs/${job._id}`).expect(401);
  });

  it("should return 404 for non-existent job when DELETE /api/jobs/:id is called", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    await api
      .delete(`/api/jobs/${fakeId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(404);
  });
});
