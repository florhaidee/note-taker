const express = require('express')
const app = express()
const PORT = process.env.PORT || 3002;
const apiRoutes = require('./routes/apiRoutes');
//const htmlRoutes = require('./routes/htmlRoutes');
const { notes } = require('./data/notes');

app.use('/api', apiRoutes);
//app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});