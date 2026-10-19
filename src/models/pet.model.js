
import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specie: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        default: null
    },
    adopted: {
        type: Boolean,
        default: false
    }
});

const petModel = mongoose.model('pets', petSchema);

export default petModel;
