const mongoose = require('mongoose');

const ActividadSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    tareaID: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tarea'
    }
});

module.exports = mongoose.model('Actividades', ActividadSchema);