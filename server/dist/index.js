import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma';
import { authRouter } from './routes/auth';
import { bookingRouter } from './routes/booking';
import { washerRouter } from './routes/washer';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => {
    res.json({ ok: true });
});
app.get('/service-types', async (_req, res) => {
    const types = await prisma.serviceType.findMany();
    res.json(types);
});
app.use('/auth', authRouter);
app.use('/bookings', bookingRouter);
app.use('/washer', washerRouter);
const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map