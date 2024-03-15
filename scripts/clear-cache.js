const fs = require('node:fs');
const path = require('node:path');

const chache = path.resolve(__dirname, '..', 'node_modules', '.cache');

fs.rm(chache, { recursive: true, force: true }, () => { console.log('Cache cleared!'); });
