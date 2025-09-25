const fs = require('fs');
const path = require('path');


const logFilePath = path.join(__dirname, 'log.txt');

const logger = (req, res, next) => {
  const logMessage = `a call was made - ${new Date().toISOString()}\n`;

  
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file', err);
    }
  });

  next(); 
};

module.exports = logger;
