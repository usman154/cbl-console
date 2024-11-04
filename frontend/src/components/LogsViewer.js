import React from 'react';
import { Box } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const LogViewer = ({ jobType, logs }) => (
  
  <Box>
    <h3>Logs for {jobType}</h3>
    <Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
      <SyntaxHighlighter
        showLineNumbers={true}
        language="javascript"
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          fontSize: '0.875rem',
          lineHeight: 1.5,
          margin: 0,
        }}
        style={darcula}
      >
        {logs.join('\n')}
      </SyntaxHighlighter>
    </Box>
  </Box>
);
