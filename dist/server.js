import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRouter from './routes/authRoute.js';
import itemRouter from './routes/itemRoute.js';
import swapRouter from './routes/swapRoute.js';
import reviewRouter from './routes/reviewRoute.js';
import disputeRouter from './routes/disputeRoute.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
const app = express();
connectDB();
app.use(helmet());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable X-RateLimit-* headers
});
app.use(limiter);
app.use('/api/auth', authRouter);
app.use('/api/items', itemRouter);
app.use('/api/swaps', swapRouter);
app.use('/api/review', reviewRouter);
app.use('/api/dispute', disputeRouter);
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Shu Shu Server Started ${port}`);
});
//# sourceMappingURL=server.js.map