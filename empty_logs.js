const fs = require('fs');
fs.writeFile('server.txt', '', (err) => {
  if (err) {
    console.error('Error emptying the log file:', err);
  } else {
    console.log('Log file emptied succesfully.');
  }
});