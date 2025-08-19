import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAuth } from '../middleware/auth';

export const washerRouter = Router();

washerRouter.post('/status', requireAuth, async (req, res) => {
  if (req.auth!.role !== 'WASHER') return res.status(403).json({ error: 'Forbidden' });
  const { isOnline } = req.body as { isOnline: boolean };
  const washer = await prisma.washer.update({ where: { userId: req.auth!.userId }, data: { isOnline } });
  res.json(washer);
});

washerRouter.get('/jobs', requireAuth, async (req, res) => {
  if (req.auth!.role !== 'WASHER') return res.status(403).json({ error: 'Forbidden' });
  const jobs = await prisma.booking.findMany({ where: { status: 'PENDING' }, take: 20, orderBy: { createdAt: 'desc' } });
  res.json(jobs);
});

washerRouter.post('/accept', requireAuth, async (req, res) => {
  if (req.auth!.role !== 'WASHER') return res.status(403).json({ error: 'Forbidden' });
  const { bookingId } = req.body as { bookingId: string };
  const washer = await prisma.washer.findUnique({ where: { userId: req.auth!.userId } });
  if (!washer) return res.status(400).json({ error: 'Washer not found' });
  const booking = await prisma.booking.update({ where: { id: bookingId }, data: { washerId: washer.id, status: 'CONFIRMED' } });
  res.json(booking);
});

