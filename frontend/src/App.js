import React, { useEffect, useState } from "react";
import { startJob } from "./api";
import { LogViewer } from "./components/LogsViewer";
import { Header as PageHeader } from "./components/TitlePage";
import { useToken } from "./TokenContext";
import { TokenInput } from "./components/TokenInput";
import useWebSocket from "./wsClient";
import { CUSTOM_STYLES } from './style.js';
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
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SyncIcon from '@mui/icons-material/Sync';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const App = () => {
  const { token } = useToken();
  const { terminalDialogStyles } = CUSTOM_STYLES;

  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobLogs, setJobLogs] = useState({});

  const addLogEntry = (jobType, logEntry) => {
    setJobLogs((prevLogs) => ({
      ...prevLogs,
      [jobType]: [...(prevLogs[jobType] || []), logEntry],
    }));
  };

  const jobStatuses = useWebSocket(addLogEntry);

  if (!token) {
    return <TokenInput />;
  }

  const handleStartJob = async (jobType) => {
    if (jobStatuses[jobType] && ['completed', 'error'].includes(jobStatuses[jobType].status)) {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon color="success" />;
      case 'error': return <ErrorIcon color="error" />;
      case 'running': return <SyncIcon color="action" />;
      default: return <HourglassEmptyIcon color="disabled" />;
    }
  };

  return (
    <>
      <PageHeader />
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          color: "#333333",
          padding: '20px',
        }}
      >
        <Grid container spacing={4} justifyContent="flex-start">
          {jobs.map(({ jobType, name, description }) => (
            <Grid item xs={12} sm={6} md={4} key={jobType}>
              <Card
                sx={{
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                  minHeight: "280px",
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <CardContent>
                <Chip
                    icon={getStatusIcon(jobStatuses[jobType]?.status)}
                    label={jobStatuses[jobType]?.status || 'idle'}
                    color={
                      jobStatuses[jobType]?.status === "completed" ? "success"
                        : jobStatuses[jobType]?.status === "error" ? "error"
                          : jobStatuses[jobType]?.status === "running" ? "warning"
                            : "default"
                    }
                    size="small"
                    sx={{ textTransform: 'uppercase', fontWeight: 'medium', mb: '20px' }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {name}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {description || "No description available."}
                  </Typography>
                </CardContent>
                <CardActions sx={{  paddingX: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleStartJob(jobType)}
                    disabled={jobStatuses[jobType]?.status === 'running'}
                    sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
                  >
                    Start
                  </Button>
                  
                  <Button variant="text" onClick={() => openLogViewer(jobType)}>
                    Logs
                  </Button>
                </CardActions>
              </Card>
            </Grid>

          ))}
        </Grid>

        {/* Modal for LogViewer */}
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              ...terminalDialogStyles.modal,
              backgroundColor: "#ffffff",
              color: "#333333",
              fontFamily: '"Courier New", Courier, monospace',
            },
          }}
        >
          <DialogTitle sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: "#e0e0e0",
            color: "#333333",
          }}>
            <Box sx={terminalDialogStyles.headerDotsContainer}>
              <span style={{ ...terminalDialogStyles.dot, backgroundColor: '#ff5f56' }} />
              <span style={{ ...terminalDialogStyles.dot, backgroundColor: '#ffbd2e' }} />
              <span style={{ ...terminalDialogStyles.dot, backgroundColor: '#27c93f' }} />
            </Box>
            Logs for {selectedJob}
            <IconButton aria-label="close" onClick={closeModal} sx={{ color: "#333333" }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ backgroundColor: "#f5f5f5", color: "#333333" }}>
            {selectedJob && <LogViewer jobType={selectedJob} logs={jobLogs[selectedJob] || []} />}
          </DialogContent>
        </Dialog>
      </Grid>
    </>
  );
};

export default App;
