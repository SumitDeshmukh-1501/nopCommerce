export function getTestData(filePath) {
  const fs = require('fs');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}