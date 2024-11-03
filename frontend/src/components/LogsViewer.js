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
        style={darcula}
      >
        {logs.join('\n')}
      </SyntaxHighlighter>
    </Box>
  </Box>
);
