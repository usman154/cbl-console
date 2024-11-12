const { spawn } = require("child_process");
const logger = require('../logger/logger.config.js');
const { notifyAllClients } = require("../utils/websocket");
const path = require("path");
const { SERVICE_MAP } = require("./serviceMap");

const jobStatus = new Map();

function startJob(userId, jobType) {

  logger.info(`Request received by ${userId} to start ${jobType}`);
  
  if (jobStatus.has(jobType) && jobStatus.get(jobType).status === "running") {
    logger.info(`Job ${jobType} is already running`);
    return { message: "Job is already running" };
  }

  const jobId = `${userId}-${jobType}-${Date.now()}`;
  const scriptPath = path.join(__dirname, "..",  "..",  `CBL`);
  
  const npmScriptCommand = SERVICE_MAP[jobType];
  console.log(`Running job : ${npmScriptCommand}`);
  const jobProcess = spawn("npm run", [npmScriptCommand], { cwd: scriptPath , shell: true});

  // Update the global job status
  jobStatus.set(jobType, {
    jobId,
    status: "running",
    process: jobProcess,
    startedBy: userId,
  });

  logger.info(`Job ${jobType} is ${getJobStatus(jobType)}`);

  const heartbeatInterval = setInterval(() => {
    if (jobStatus.get(jobType)?.status === "running") {
      logger.info(`Job ${jobType} is ${getJobStatus(jobType)}`);
      notifyAllClients({ jobId, jobType, status: "running", type: "heartbeat", message: "Job is still running..." });
    }
  }, 5000);

  jobProcess.stdout.on("data", (data) => {
    
    jobStatus.set(jobType, { ...jobStatus.get(jobType), status : 'running' });
    logger.info(`Job ${jobType} is ${getJobStatus(jobType)}`);
    notifyAllClients({ jobId, jobType, status: "running", type: 'log', message: data.toString()  });
  });
  jobProcess.stderr.on("data", (data) => {
    
    jobStatus.set(jobType, { ...jobStatus.get(jobType), status: 'error' });
    logger.info(`Job ${jobType} is ${getJobStatus(jobType)}`);
    notifyAllClients({ jobId, jobType, status: "error", type: 'log', message: data.toString()  });
  });
  jobProcess.on("error", (err) => {
    console.error(`Failed to start process: ${err.message}`);
    jobStatus.set(jobType, { ...jobStatus.get(jobType), status: 'error' });
    logger.info(`Job ${jobType} is ${getJobStatus(jobType)}`);
    notifyAllClients({ jobId, jobType, status: "error", type: 'log', message: data.toString()  });
  });
  

  jobProcess.on("close", (code) => {
    console.log("completed the job");
    const status = code === 0 ? "completed" : "error";
    jobStatus.set(jobType, { ...jobStatus.get(jobType), status });
    logger.info(`Job ${jobType} is ${getJobStatus(jobType)}`);
    clearInterval(heartbeatInterval);
    // Notify all clients about the job status update
    notifyAllClients({ jobId, jobType, status });
  });

  return { jobId };
}

function getJobStatus(jobType) {
  return jobStatus.has(jobType) ? jobStatus.get(jobType).status : "not started";
}

module.exports = { startJob, getJobStatus };
