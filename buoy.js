const crypto = require("crypto");
const send = require('./send');

const id = crypto.randomBytes(16).toString("hex");

const salinity = {
  cl: 0.5405,
  na: 0.4645,
  mg: 0.0526,
  so2: 0.0279,
  ca: 0.01022,
  k: 0.01011,
  c: 0.0023,
  br: 0.00083,
  b: 0.00041,
  sr: 0.00009,
  f: 0.00007
};

const applyVariance = (salinity) => {
  Object.keys(salinity).forEach(chemical => {
    salinity[chemical] += 0.001 * (Math.random() - 0.5) * salinity[chemical];
  });
};

const toString = s => `${id} ${new Date().toISOString()}: Cl- ${s.cl}, Na+ ${s.na}, Mg2+ ${s.mg}, SO24- ${s.so2}, Ca2+ ${s.ca}, K+ ${s.k}, C ${s.c}, Br- ${s.br}, B ${s.b}, Sr ${s.sr}, F- ${s.f}`;

function sendData() {
  applyVariance(salinity);
  const data = toString(salinity);

  send(data);
};

const fiveSeconds = 5000;

setInterval(sendData, fiveSeconds);