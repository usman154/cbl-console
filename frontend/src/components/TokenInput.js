import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useToken } from '../TokenContext';
import { Grid } from '@mui/material';

export const TokenInput = () => {
  const { setToken } = useToken();
  const [inputToken, setInputToken] = useState('');

  const handleTokenSubmit = () => {
    setToken(inputToken);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <TextField
            label="Enter your token"
            variant="outlined"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            fullWidth
          />
          <Button variant="contained" type="submit" onClick={handleTokenSubmit}>
            Submit Token
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};