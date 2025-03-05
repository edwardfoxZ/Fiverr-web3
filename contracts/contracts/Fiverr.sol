// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Fiverr {
    enum WhoAreYou {
        TALENT,
        JOBMANAGER
    }
    enum JobTypes {
        FULLTIME,
        PARTTIME,
        FREELANCE
    }
    struct User {
        uint id;
        address addr;
        WhoAreYou role;
    }
    struct UserWork {
        uint id;
        address user;
        WhoAreYou role;
        JobTypes jobTypes;
        uint jobId;
    }
    struct Job {
        uint id;
        address creator;
        bytes company;
        bytes description;
        JobTypes jobType;
        uint price;
        uint date;
        bool isOpen;
    }
    mapping(uint => Job) private jobs;
    mapping(address => User) private users;
    mapping(address => bool) private registered;
    mapping(address => UserWork[]) private userWorks;
    mapping(address => bool) private isApplied;

    address[] private userAddrs;
    uint private nextUserId;
    uint private nextJobId;
    uint private nextJobsUserId;

    /// @notice Register as either a TALENT (job seeker) or JOBMANAGER (job creator)
    function register(WhoAreYou _role) external {
        require(!registered[msg.sender], "User already registered");

        users[msg.sender] = User(nextUserId, msg.sender, _role);
        registered[msg.sender] = true;
        userAddrs.push(msg.sender);
        nextUserId++;
    }

    /// @notice Allows Job Managers to create job postings
    function listJob(
        bytes memory company,
        bytes memory description,
        JobTypes jobType,
        uint price
    ) external userNotRegistered {
        require(
            users[msg.sender].role == WhoAreYou.JOBMANAGER,
            "Only Job Managers can post jobs"
        );

        jobs[nextJobId] = Job(
            nextJobId,
            msg.sender,
            company,
            description,
            jobType,
            price,
            block.timestamp,
            true // Job is open by default
        );
        nextJobId++;
    }

    /// @notice Allows Talents to apply for jobs (or interact with them)
    function applyForJob(
        uint jobId
    ) external userNotRegistered onlyTalents(WhoAreYou.TALENT) {
        require(jobId < nextJobId, "Invalid job ID");
        require(jobs[jobId].isOpen, "Job is not open");
        require(!isApplied[msg.sender], "Already applied");

        userWorks[msg.sender].push(
            UserWork(
                nextJobsUserId,
                msg.sender,
                WhoAreYou.TALENT,
                jobs[jobId].jobType,
                jobId
            )
        );

        isApplied[msg.sender] = true;
        nextJobsUserId++;
    }

    /// @notice Close a job (only the creator can do this)
    function closeJob(uint jobId) external {
        require(
            jobs[jobId].creator == msg.sender,
            "Only creator can close the jobs"
        );

        jobs[jobId].isOpen = false;
    }

    /** See the get funcs */
    function getJobs() external view returns (Job[] memory) {
        Job[] memory jobList = new Job[](nextJobId);
        for (uint i = 0; i < nextJobId; i++) {
            jobList[i] = jobs[i];
        }
        return jobList;
    }

    function getTalents() external view returns (User[] memory) {
        uint talentCount = 0;
        for (uint i = 0; i < userAddrs.length; i++) {
            if (users[userAddrs[i]].role == WhoAreYou.TALENT) {
                talentCount++;
            }
        }

        User[] memory talents = new User[](talentCount);
        uint index = 0;
        for (uint i = 0; i < userAddrs.length; i++) {
            if (users[userAddrs[i]].role == WhoAreYou.TALENT) {
                talents[index] = users[userAddrs[i]];
                index++;
            }
        }

        return talents;
    }

    modifier userNotRegistered() {
        require(registered[msg.sender], "User not registered");
        _;
    }

    modifier onlyTalents(WhoAreYou _type) {
        require(users[msg.sender].role == _type, "Only talent can get jobs");
        _;
    }
}
