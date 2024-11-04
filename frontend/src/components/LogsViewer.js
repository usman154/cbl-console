import React from 'react';
import { Box } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const LogViewer = ({ jobType, logs }) => (
  
  <Box>
    <h3>Logs for {jobType}</h3>
    <Box component="pre" >
      <SyntaxHighlighter
        showLineNumbers={true}
        lineProps={{style: {flexWrap: 'wrap', wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
        language="javascript"
        wrapLongLines={true}
      
        style={darcula}
      >
        {logs.join('\n')}
      </SyntaxHighlighter>
    </Box>
  </Box>
);
