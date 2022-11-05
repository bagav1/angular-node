require('dotenv').config();
const apiRouter = require('./src/routes/api')
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT;

app.use(cors({ origin: 'http://localhost:4201' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});