const { startJob, getJobStatus } = require('../services/jobService');

exports.startJob = (req, res) => {
  const userId = req.userId;
  const { jobType } = req.body;

  // Attempt to start the job
  const result = startJob(userId, jobType);
  res.json(result);
};

exports.getJobStatus = (req, res) => {
  const { jobType } = req.query;
  res.json({ status: getJobStatus(jobType) });
};
