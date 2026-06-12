const fs = require('fs');
const { execSync } = require('child_process');
let out = '';
try {
  out += 'CLIENT:\n' + execSync('npm audit fix', {cwd: './client', stdio: 'pipe'}).toString() + '\n';
} catch(e) { out += e.stdout ? e.stdout.toString() : e.toString() }
try {
  out += 'SERVER:\n' + execSync('npm audit fix', {cwd: './server', stdio: 'pipe'}).toString() + '\n';
} catch(e) { out += e.stdout ? e.stdout.toString() : e.toString() }
fs.writeFileSync('out.txt', out);
process.exit(0);
