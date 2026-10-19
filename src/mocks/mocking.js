
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Contraseña encriptada para los usuarios mock
const encryptedPassword = bcrypt.hashSync('coder123', 10);

// Generación de usuarios
export const generateUsers = (quantity = 50) => {
    const users = [];

    for (let i = 0; i < quantity; i++) {
        const id = new mongoose.Types.ObjectId();

        const user = {
            _id: id,
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: `mock-${id.toString()}@example.com`,
            password: encryptedPassword,
            role: faker.helpers.arrayElement([
                'user',
                'admin'
            ]),
            pets: []
        };

        users.push(user);
    }

    return users;
};

// Generación de mascotas
export const generatePets = (quantity = 100) => {
    const pets = [];

    for (let i = 0; i < quantity; i++) {
        const pet = {
            _id: new mongoose.Types.ObjectId(),
            name: faker.person.firstName(),
            specie: faker.helpers.arrayElement([
                'dog',
                'cat',
                'bird',
                'rabbit',
                'hamster'
            ]),
            birthDate: faker.date.past(),
            adopted: faker.datatype.boolean()
        };

        pets.push(pet);
    }

    return pets;
};
