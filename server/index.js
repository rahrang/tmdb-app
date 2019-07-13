const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.set('port', PORT);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
