const express = require('express');
const connectDB = require('./config/db');
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }))


app.get('/', (req, res) => {
    res.json({msg: PORT})
})

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Serving server on http://localhost:" + PORT);
})