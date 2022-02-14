const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividadController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/', 
    auth,
    [ 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('tareaID', 'La tarea de la actividad es obligatoria').not().isEmpty()
     ],
    actividadController.crearActividad
);

router.get('/',
    auth,
    actividadController.obtenerActividades
)

router.put('/:id',
    auth,
    actividadController.actualizarActividad
)

router.delete('/:id',
     auth,
     actividadController.eliminarActividad
)

module.exports = router;
