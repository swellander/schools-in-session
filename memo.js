const jwt = require('jwt-simple');

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.8GuClN3Ygz84Nmqt_Vxg6FsLvDlYR11KpthmlvlfrP4'
const id = jwt.decode(token, 'can');

console.log(id);

