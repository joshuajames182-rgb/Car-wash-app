import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAuth } from '../middleware/auth';
export const bookingRouter = Router();
bookingRouter.post('/', requireAuth, async (req, res) => {
    const { serviceTypeId, vehicleMake, vehicleModel, vehicleSize, scheduledFor, locationLat, locationLng, priceCents } = req.body;
    if (!serviceTypeId || !vehicleMake || !vehicleModel || !vehicleSize || !scheduledFor || !locationLat || !locationLng || !priceCents) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const booking = await prisma.booking.create({
        data: {
            serviceTypeId,
            vehicleMake,
            vehicleModel,
            vehicleSize,
            scheduledFor: new Date(scheduledFor),
            locationLat,
            locationLng,
            priceCents,
            customerId: req.auth.userId,
        },
    });
    res.json(booking);
});
bookingRouter.get('/me', requireAuth, async (req, res) => {
    const bookings = await prisma.booking.findMany({ where: { customerId: req.auth.userId }, orderBy: { createdAt: 'desc' } });
    res.json(bookings);
});
//# sourceMappingURL=booking.js.map