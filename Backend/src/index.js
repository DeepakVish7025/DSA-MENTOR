
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
const contestRoutes = require("./routes/contestRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const courseProgressRoutes = require("./routes/courseProgressRoutes");





app.use(cors({
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

app.use("/api/contests", contestRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/course-progress", courseProgressRoutes);

const InitalizeConnection = async () => {
    try {
        await main();
        console.log("DB Connected");
        
        // Start Server first so app is accessible
        app.listen(process.env.PORT, () => {
            console.log("Server listening at port number: " + process.env.PORT);
        });

        // Attempt Redis connection in background
        redisClient.connect().then(() => {
            console.log("Redis Connected Successfully ⚡");
        }).catch((err) => {
            console.error("Redis Connection Error: " + err.message);
            console.log("Network blocked port. API will still work without Redis.");
        });

    } catch (err) {
        console.log("Error: " + err);
    }
}


InitalizeConnection();
