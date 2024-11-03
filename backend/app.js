const express = require('express');
const cors = require('cors');

const authenticate = require('./middleware/auth');
const jobController = require('./controllers/jobController');
require('dotenv').config(); // Load environment variables from .env file
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.post('/start-job', authenticate, jobController.startJob);
app.get('/job-status', authenticate, jobController.getJobStatus);

module.exports = app;
