
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const INFO_TRANSPORTER = new DailyRotateFile({
    filename: './logs/info-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'info',
    zippedArchive: false,
    maxSize: '20m', // Set the maximum log file size
    maxFiles: '1d'
});
const ERROR_TRANSPORTER = new DailyRotateFile({
    filename: './logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    zippedArchive: false,
    maxSize: '20m', // Set the maximum log file size
    maxFiles: '1d'
});
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.splat(), 
        winston.format.timestamp(),
        winston.format.json(),
       
    ),
    transports: [
        ERROR_TRANSPORTER,
        INFO_TRANSPORTER
    ]
});

module.exports = logger;
