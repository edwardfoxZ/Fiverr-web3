const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fiverr Contract", function () {
  let Fiverr;
  let fiverr;
  let owner, user1, user2, jobManager;
  let userRoleTalent, userRoleJobManager;

  beforeEach(async function () {
    // Deploy the Fiverr contract before each test
    [owner, user1, user2, jobManager] = await ethers.getSigners();

    Fiverr = await ethers.getContractFactory("Fiverr");
    fiverr = await Fiverr.deploy();
    await fiverr.deployed();

    userRoleTalent = 0; // TALENT
    userRoleJobManager = 1; // JOBMANAGER
  });

  it("should register a user as a talent", async function () {
    // User1 registers as TALENT
    await fiverr.connect(user1).register(userRoleTalent);

    const user = await fiverr.users(user1.address);
    expect(user.addr).to.equal(user1.address);
    expect(user.role).to.equal(userRoleTalent);
  });

  it("should register a user as a job manager", async function () {
    // User2 registers as JOBMANAGER
    await fiverr.connect(user2).register(userRoleJobManager);

    const user = await fiverr.users(user2.address);
    expect(user.addr).to.equal(user2.address);
    expect(user.role).to.equal(userRoleJobManager);
  });

  it("should allow job manager to list a job", async function () {
    // Register job manager
    await fiverr.connect(jobManager).register(userRoleJobManager);

    // Job manager lists a job
    const company = ethers.utils.formatBytes32String("Company XYZ");
    const description = ethers.utils.formatBytes32String(
      "Full-time developer role"
    );
    const jobType = 0; // FULLTIME
    const price = ethers.utils.parseEther("1");

    await fiverr
      .connect(jobManager)
      .listJob(company, description, jobType, price);

    const jobs = await fiverr.getJobs();
    expect(jobs.length).to.equal(1);
    expect(jobs[0].creator).to.equal(jobManager.address);
    expect(jobs[0].company).to.equal(company);
    expect(jobs[0].description).to.equal(description);
    expect(jobs[0].jobType).to.equal(jobType);
    expect(jobs[0].price).to.equal(price);
    expect(jobs[0].isOpen).to.equal(true);
  });

  it("should not allow a talent to list a job", async function () {
    // Register talent
    await fiverr.connect(user1).register(userRoleTalent);

    const company = ethers.utils.formatBytes32String("Company XYZ");
    const description = ethers.utils.formatBytes32String(
      "Full-time developer role"
    );
    const jobType = 0; // FULLTIME
    const price = ethers.utils.parseEther("1");

    await expect(
      fiverr.connect(user1).listJob(company, description, jobType, price)
    ).to.be.revertedWith("Only Job Managers can post jobs");
  });

  it("should allow talent to apply for a job", async function () {
    // Register job manager and talent
    await fiverr.connect(jobManager).register(userRoleJobManager);
    await fiverr.connect(user1).register(userRoleTalent);

    // Job manager lists a job
    const company = ethers.utils.formatBytes32String("Company XYZ");
    const description = ethers.utils.formatBytes32String(
      "Full-time developer role"
    );
    const jobType = 0; // FULLTIME
    const price = ethers.utils.parseEther("1");

    await fiverr
      .connect(jobManager)
      .listJob(company, description, jobType, price);

    // Talent applies for the job
    const jobId = 0; // The first job in the list
    await fiverr.connect(user1).applyForJob(jobId);

    const userWorks = await fiverr.userWorks(user1.address);
    expect(userWorks.length).to.equal(1);
    expect(userWorks[0].user).to.equal(user1.address);
    expect(userWorks[0].jobId).to.equal(jobId);
  });

  it("should not allow a talent to apply for the same job twice", async function () {
    // Register job manager and talent
    await fiverr.connect(jobManager).register(userRoleJobManager);
    await fiverr.connect(user1).register(userRoleTalent);

    // Job manager lists a job
    const company = ethers.utils.formatBytes32String("Company XYZ");
    const description = ethers.utils.formatBytes32String(
      "Full-time developer role"
    );
    const jobType = 0; // FULLTIME
    const price = ethers.utils.parseEther("1");

    await fiverr
      .connect(jobManager)
      .listJob(company, description, jobType, price);

    // Talent applies for the job
    const jobId = 0; // The first job in the list
    await fiverr.connect(user1).applyForJob(jobId);

    // Talent tries to apply again
    await expect(fiverr.connect(user1).applyForJob(jobId)).to.be.revertedWith(
      "Already applied"
    );
  });

  it("should allow job manager to close the job", async function () {
    // Register job manager and talent
    await fiverr.connect(jobManager).register(userRoleJobManager);
    await fiverr.connect(user1).register(userRoleTalent);

    // Job manager lists a job
    const company = ethers.utils.formatBytes32String("Company XYZ");
    const description = ethers.utils.formatBytes32String(
      "Full-time developer role"
    );
    const jobType = 0; // FULLTIME
    const price = ethers.utils.parseEther("1");

    await fiverr
      .connect(jobManager)
      .listJob(company, description, jobType, price);

    const jobId = 0; // The first job in the list
    await fiverr.connect(jobManager).closeJob(jobId);

    const job = await fiverr.jobs(jobId);
    expect(job.isOpen).to.equal(false);
  });

  it("should not allow non-creators to close a job", async function () {
    // Register job manager and talent
    await fiverr.connect(jobManager).register(userRoleJobManager);
    await fiverr.connect(user1).register(userRoleTalent);

    // Job manager lists a job
    const company = ethers.utils.formatBytes32String("Company XYZ");
    const description = ethers.utils.formatBytes32String(
      "Full-time developer role"
    );
    const jobType = 0; // FULLTIME
    const price = ethers.utils.parseEther("1");

    await fiverr
      .connect(jobManager)
      .listJob(company, description, jobType, price);

    const jobId = 0; // The first job in the list

    // Talent tries to close the job (should fail)
    await expect(fiverr.connect(user1).closeJob(jobId)).to.be.revertedWith(
      "Only creator can close the jobs"
    );
  });
});
