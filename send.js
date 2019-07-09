const exec = require('child_process').exec;

const TO_AWS = process.env.TO_AWS || false;

module.exports = data => {
  if(TO_AWS) {
    exec(`aws lambda invoke --function-name receive-ocean-data --payload '{"data": "${data}"}' /dev/null`, (error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if(error) {
        console.error(error);
      }
    });
  } else {
    console.log(data);
  }
};