const express = require('express');
const router = express.Router();
const usuariocontroller = require('../controllers/usuariosController');
const { check } = require('express-validator');

router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 })
    ],      
    usuariocontroller.crearUsuario
);

module.exports = router;