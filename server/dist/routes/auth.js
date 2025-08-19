import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';
export const authRouter = Router();
authRouter.post('/register', async (req, res) => {
    const { email, password, firstName, lastName, role } = req.body;
    if (!email || !password || !firstName || !lastName || !role)
        return res.status(400).json({ error: 'Missing fields' });
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({ data: { email, passwordHash, firstName, lastName, role } });
        if (role === 'WASHER') {
            await prisma.washer.create({ data: { userId: user.id } });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || 'dev-secret-change');
        res.json({ token, user });
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
});
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
        return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || 'dev-secret-change');
    res.json({ token, user });
});
//# sourceMappingURL=auth.js.map