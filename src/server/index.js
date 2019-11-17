require('../devUtils/devServerEvents/server');
const express = require('express')
const path = require('path');
const app = express();


const port = 3000;

app.use('/', express.static(path.resolve(__dirname + '/../frontend/views/')));
app.use('/devUtils', express.static(path.resolve(__dirname + '/../devUtils/')));

app.use(function(error, req, res, next) {
  console.log('LOG:', req.path);

  next();
});
app.get('/api', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));