const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fiverr Contract", function () {
  let Fiverr;
  let fiverr;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Deploy the contract before each test
    Fiverr = await ethers.getContractFactory("Fiverr");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    fiverr = await Fiverr.deploy();
  });

  it("should register a user as a TALENT", async function () {
    await fiverr.connect(addr1).register(0); // 0 is for TALENT
    const user = await fiverr.users(addr1.address); // Fetch user by address
    expect(user.role).to.equal(0); // TALENT
  });

  it("should allow job managers to create jobs", async function () {
    await fiverr.connect(owner).register(1); // 1 is for JOBMANAGER
    const companyBytes = ethers.utils.toUtf8Bytes("Company A");
    const descriptionBytes = ethers.utils.toUtf8Bytes("Job Description");

    await fiverr
      .connect(owner)
      .listJob(companyBytes, descriptionBytes, 1, 1000);

    const job = await fiverr.jobs(0); // Fetch the first job
    expect(ethers.utils.toUtf8String(job.company)).to.equal("Company A");
    expect(job.price.toString()).to.equal("1000");
  });

  it("should allow talent to apply for a job", async function () {
    await fiverr.connect(owner).register(1); // Register owner as JobManager
    const companyBytes = ethers.utils.toUtf8Bytes("Company A");
    const descriptionBytes = ethers.utils.toUtf8Bytes("Job Description");
    await fiverr
      .connect(owner)
      .listJob(companyBytes, descriptionBytes, 1, 1000);

    await fiverr.connect(addr1).register(0); // Register addr1 as TALENT
    await fiverr.connect(addr1).applyForJob(0); // Apply for job with id 0

    const userWorks = await fiverr.userWorks(addr1.address);
    expect(userWorks[0].jobId.toString()).to.equal("0");
  });
});
