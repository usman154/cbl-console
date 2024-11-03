export async function startJob(token, jobType) {
  const res = await fetch('http://localhost:3000/start-job', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
    body: JSON.stringify({ jobType })
  });
  return res.json();
}

export async function getJobStatus(token, jobType) {
  const res = await fetch(`http://localhost:3000/job-status?jobType=${jobType}`, {
    headers: { Authorization: `${token}` }
  });
  return res.json();
}
