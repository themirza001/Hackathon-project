const express = require('express');
const app = express();
const doctorRouter = require('./routes/doctorRoutes');
app.use(express.json());

app.use('/api/v1/doctor', doctorRouter);

module.exports = app;
