import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import useWebSocket from '../wsClient';

export const LogViewer = ({ jobType }) => {
  const jobStatuses = useWebSocket();
  const logs = jobStatuses[jobType]?.logs || [];
  const logsEndRef = useRef(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        height: '300px',
        overflowY: 'scroll',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h6">Logs for {jobType}</Typography>
      {logs.map((log, index) => (
        <Typography
          key={index}
          style={{
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#333',
          }}
        >
          {log}
        </Typography>
      ))}
      <div ref={logsEndRef} />
    </Box>
  );
};

