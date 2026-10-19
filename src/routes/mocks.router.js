
import { Router } from 'express';
import {
    generateUsers,
    generatePets
} from '../mocks/mocking.js';

import userModel from '../models/user.model.js';
import petModel from '../models/pet.model.js';

const router = Router();

// GET /api/mocks/mockingpets
router.get('/mockingpets', (req, res) => {
    try {
        const pets = generatePets(100);

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

// GET /api/mocks/mockingusers
router.get('/mockingusers', (req, res) => {
    try {
        const users = generateUsers(50);

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

// POST /api/mocks/generateData
router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body ?? {};

        const validQuantity = (value) =>
            Number.isSafeInteger(value) &&
            value >= 0 &&
            value <= 10000;

        if (!validQuantity(users) || !validQuantity(pets)) {
            return res.status(400).json({
                status: 'error',
                message: 'users y pets deben ser enteros entre 0 y 10000'
            });
        }

        const generatedUsers = generateUsers(users);
        const generatedPets = generatePets(pets);

        const insertedUsers = generatedUsers.length
            ? await userModel.insertMany(generatedUsers)
            : [];

        const insertedPets = generatedPets.length
            ? await petModel.insertMany(generatedPets)
            : [];

        res.status(201).json({
            status: 'success',
            message: 'Datos insertados correctamente',
            inserted: {
                users: insertedUsers.length,
                pets: insertedPets.length
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
