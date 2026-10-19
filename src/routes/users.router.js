
import { Router } from 'express';
import userModel from '../models/user.model.js';

const router = Router();

// GET /api/users
router.get('/', async (req, res) => {
    try {
        const users = await userModel
            .find()
            .select('-password')
            .lean();

        res.status(200).json({
            status: 'success',
            payload: users
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
