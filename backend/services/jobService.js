const { spawn } = require("child_process");
const { notifyAllClients } = require("../utils/websocket");
const path = require("path");
const { SERVICE_MAP } = require("./serviceMap");

const jobStatus = new Map();

function startJob(userId, jobType) {
  
  if (jobStatus.has(jobType) && jobStatus.get(jobType).status === "running") {
    return { message: "Job is already running" };
  }

  const jobId = `${userId}-${jobType}-${Date.now()}`;
  const scriptPath = path.join(__dirname, "..",  "..",  `CBL_PROD`);
  
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

  jobProcess.stdout.on("data", (data) => {
    notifyAllClients({ jobId, jobType, status: "running", type: 'log', message: data.toString()  });
  });
  jobProcess.stderr.on("data", (data) => {
    notifyAllClients({ jobId, jobType, status: "error", type: 'log', message: data.toString()  });
  });
  jobProcess.on("error", (err) => {
    console.error(`Failed to start process: ${err.message}`);
    notifyAllClients({ jobId, jobType, status: "error", type: 'log', message: data.toString()  });
  });
  

  jobProcess.on("close", (code) => {
    console.log("completed the job");
    const status = code === 0 ? "completed" : "error";
    jobStatus.set(jobType, { ...jobStatus.get(jobType), status });

    // Notify all clients about the job status update
    notifyAllClients({ jobId, jobType, status });
  });

  return { jobId };
}

function getJobStatus(jobType) {
  return jobStatus.has(jobType) ? jobStatus.get(jobType).status : "not started";
}

module.exports = { startJob, getJobStatus };
