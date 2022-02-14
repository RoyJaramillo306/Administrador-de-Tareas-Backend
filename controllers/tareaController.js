const Tarea = require('../models/Tarea');
const Actividad = require('../models/ActividadesModel');
const { validationResult } = require('express-validator');

exports.crearTarea = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    try {
        
        const tarea = new Tarea(req.body);

        tarea.creador = req.usuario.id;

        tarea.save();

        res.json(tarea);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');    
    }

}

exports.obtenerTareas = async (req, res) => {

    try {
        const tareas = await Tarea.find({ creador: req.usuario.id });
        res.json({ tareas });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarTarea = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    const { nombre } = req.body;

    try {
        
        let tarea = await Tarea.findById(req.params.id);

        if(tarea === null) return res.status(404).json({ msg: 'Tarea no encontrada :(' });

        if( tarea.creador.toString() !== req.usuario.id ) return res.status(401).json({ msg: 'Usuario no autorizado' });

        tarea = await Tarea.findByIdAndUpdate({ _id: req.params.id }, { $set: { nombre: nombre } }, { new: true });

        res.json({tarea});

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}

exports.eliminarTarea = async (req, res) => {

    try {

        const tarea = await Tarea.findById(req.params.id);

        if(tarea === null) return res.status(404).json({ msg: 'Tarea no encontrada :(' });

        if( tarea.creador.toString() !== req.usuario.id ) return res.status(401).json({ msg: 'Usuario no autorizado' });
   
        const actividades = await Actividad.deleteMany({ tareaID: req.params.id });

        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada exitosamente!' });
        
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }

}