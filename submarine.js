const send = require('./send');

const name = 'SS-763';

const salinity = {
  chloride: 0.5602,
  sodium: 0.4837,
  magnesium: 0.0606,
  sulfate: 0.02322
};

let pH = 8.11073;

const varySalinity = (salinity) => {
  Object.keys(salinity).forEach(chemical => {
    salinity[chemical] += 0.001 * (Math.random() - 0.5) * salinity[chemical];
  });
};

const varyPH = pH => pH += 0.0001 * (Math.random() - 0.5002) * pH;

const toString = (salinity, pH) => JSON.stringify({
  subid: name,
  salinity,
  pH,
  timestamp: new Date().getTime()
});

function sendData() {
  varySalinity(salinity);
  pH = varyPH(pH);
  const data = toString(salinity, pH);
  
  send(data);
};

setInterval(sendData, 12000);