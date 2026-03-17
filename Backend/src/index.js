
const express = require('express');
const app = express();
require('dotenv').config();

const main = require('./config/db');
const redisClient  = require('./config/redis');

const cookieParser = require('cookie-parser');
const authRouter = require('./routes/userAuth');
const problemRouter = require('./routes/problemCreator');
const submitRouter = require('./routes/submit');
const cors = require('cors');
const aiRouter = require('./routes/aiChatting');
const videoRouter = require('./routes/videoCreator');
const interviewRoutes = require('./routes/interviewRoutes');


// Middleware
app.use(cors({
    // agr ap chahte hai ki koi bhi aceess kr le backend ko to * ka use kr le : 
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/user', authRouter);
app.use('/problem', problemRouter);
app.use('/submission', submitRouter);
app.use('/ai',aiRouter);
app.use('/video',videoRouter);
// API routes
app.use('/api/interview', interviewRoutes);

// Initialization
const InitializeConnection = async () => {
    try {
        await redisClient.connect();
        console.log("Redis Connected");

        await main(); // DB connection
        console.log("DB Connected");

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server listening at port number: ${port}`);
        });

    } catch (err) {
        console.error("Error:", err);
    }
};

InitializeConnection();
