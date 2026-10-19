
import express from 'express';
import mongoose from 'mongoose';

import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';

const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI ||
    'mongodb://127.0.0.1:27017/backend3';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/mocks', mocksRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

// Ruta inicial
app.get('/', (req, res) => {
    res.json({
        message: 'Servidor Backend III funcionando'
    });
});

// Conexión a MongoDB e inicio del servidor
const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log('Conectado a MongoDB');

        app.listen(PORT, () => {
            console.log(
                `Servidor funcionando en http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error(
            'Error al conectar con MongoDB:',
            error.message
        );
        process.exit(1);
    }
};

startServer();
