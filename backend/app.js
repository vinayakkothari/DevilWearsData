const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Import controllers
const { loginUser } = require('./controllers/loginController');
const { signupUser } = require('./controllers/signupController');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.post('/login', loginUser);
app.post('/signup', signupUser);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
