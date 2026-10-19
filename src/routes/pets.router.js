
import { Router } from 'express';
import petModel from '../models/pet.model.js';

const router = Router();

// GET /api/pets
router.get('/', async (req, res) => {
    try {
        const pets = await petModel.find().lean();

        res.status(200).json({
            status: 'success',
            payload: pets
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
