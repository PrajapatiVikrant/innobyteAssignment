const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use('/innobyte/api/auth',require('./Route/authRoute'))
app.use('/innobyte/api/profile',require('./Route/profileRoute'))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});