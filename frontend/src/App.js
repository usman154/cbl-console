import React, { useEffect, useState } from "react";
import { startJob } from "./api";
import { LogViewer } from "./components/LogsViewer";
import { useToken } from "./TokenContext";
import { TokenInput } from "./components/TokenInput";
import useWebSocket from "./wsClient";
import jobs from "./seed.json";
import {
  Grid,
  Button,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const App = () => {
  const { token } = useToken();
  
  const [selectedJob, setSelectedJob] = useState(null); // Track which job to view logs for
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [jobLogs, setJobLogs] = useState({}); // Track logs for each job type



  const addLogEntry = (jobType, logEntry) => {
    setJobLogs((prevLogs) => ({
      ...prevLogs,
      [jobType]: [...(prevLogs[jobType] || []), logEntry], 
    }));
  };
  const jobStatuses = useWebSocket(addLogEntry);
  useEffect(() => {
    console.log("jobStatuses updated:", jobStatuses);
  }, [jobStatuses]);
  if (!token) {
    return <TokenInput />; // Show token input if no token is set
  }

  const handleStartJob = async (jobType) => {
    // Execute the job
    if (jobStatuses[jobType] && jobStatuses[jobType].status === 'completed' || jobStatuses[jobType] && jobStatuses[jobType].status === 'error') {
      // Clear logs for that jobType
      setJobLogs((prevLogs) => ({
        ...prevLogs,
        [jobType]: [], 
      }));
    }
     await startJob(token, jobType);
  };
  const openLogViewer = (jobType) => {
    setSelectedJob(jobType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };
  
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {jobs.map(({ jobType, name }) => (
            <Grid container alignItems="center" key={jobType}>
              <Grid item xs={10}>
                <Button
                  disabled={jobStatuses[jobType] && jobStatuses[jobType].status === 'running'}
                  variant="contained"
                  color="primary"
                  onClick={() => handleStartJob(jobType)}
                  fullWidth
                >
                  {`Start ${name}`}
                </Button>
              </Grid>
              <Grid item xs={2} style={{ textAlign: "right" }}>
                <Chip
                  label={jobStatuses[jobType] ? jobStatuses[jobType].status : 'idle'}
                  color={
                    jobStatuses[jobType] && jobStatuses[jobType].status === "completed"
                      ? "success"
                      : jobStatuses[jobType] && jobStatuses[jobType].status === "error"
                      ? "error"
                      : jobStatuses[jobType] && jobStatuses[jobType].status === "running"
                      ? "warning"
                      : "default"
                  }
                  
                  size="small"
                />
                <Button
                  variant="text"
                  onClick={() => openLogViewer(jobType)} // Open modal on click
                >
                  View
                </Button>
              </Grid>
            </Grid>
          ))}
          {/* Modal to display LogViewer */}
          <Dialog
            open={isModalOpen}
            onClose={closeModal}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>
              Logs for {selectedJob}
              <IconButton
                aria-label="close"
                onClick={closeModal}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
            {selectedJob && <LogViewer jobType={selectedJob} logs={jobLogs[selectedJob] || []} />}
            </DialogContent>
          </Dialog>
        </Box>
      </Grid>
    </Grid>
  );
};

export default App;
