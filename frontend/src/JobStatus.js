import React from 'react';
import useWebSocket from './wsClient';
import { startJob } from './api';

const JobStatus = () => {
  const jobStatuses = useWebSocket();

  const handleStartJob = async (jobType) => {
    const result = await startJob(jobType);
    if (result.message) {
      alert(result.message); // Show alert if job is already running
    }
  };

  return (
    <div>
      <h2>Job Statuses:</h2>
      {Object.entries(jobStatuses).map(([jobType, { status }]) => (
        <div key={jobType}>
          <h3>{jobType}</h3>
          <p>Status: {status}</p>
          {status === 'running' ? (
            <p>Job is currently running. Please wait until it completes.</p>
          ) : (
            <button onClick={() => handleStartJob(jobType)}>Start {jobType}</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobStatus;
