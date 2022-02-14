const Usuario = require("../models/Usuario");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({ email });

        if (!usuario) return res.status(400).json({ msg: 'El usuario no existe' }); 

        const pass = await bcryptjs.compare(password, usuario.password);

        if(!pass) return res.status(400).json({ msg: 'Password incorrecto' });

        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            res.json({ token, msg: 'Inicio de sesión exitosa!' });
        });

    } catch (error) {
        
    }

}

exports.usuarioAutenticado = async (req, res) => {

    try {
        
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor' });
    }

}