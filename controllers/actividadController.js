const { validationResult } = require('express-validator');
const Actividad = require('../models/ActividadesModel');
const Tarea = require('../models/Tarea');

exports.crearActividad = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { tareaID } = req.body;

    try {
        
        const tarea = await Tarea.findById(tareaID);

        if(tarea === null) return res.status(404).json({ msg: 'Tarea de la actividad no encontrada' });

        if( tarea.creador.toString() !== req.usuario.id ) return res.status(401).json({ msg: 'Usuario no autorizado' });

        const actividad = new Actividad(req.body);
        await actividad.save();
        res.json({ actividad });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error en el servidor');
    }

}

exports.obtenerActividades = async (req, res) => {

    try {

        const { id } = req.query;

        const tarea = await Tarea.findById(id);

        if(tarea === null) return res.status(404).json({ msg: 'Tarea de la actividad no encontrada' });

        if( tarea.creador.toString() !== req.usuario.id ) return res.status(401).json({ msg: 'Usuario no autorizado' });

        const actividades = await Actividad.find({ tareaID: id });
        res.json({ actividades });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarActividad = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    try {

        const { nombre, estado } = req.body;
        
        let actividad = await Actividad.findById(req.params.id);

        if(actividad === null) return res.status(404).json({ msg: 'Actividad no encontrada :(' });

        actividad = await Actividad.findByIdAndUpdate({ _id: req.params.id }, { $set: { nombre: nombre, estado: estado } }, { new: true });

        res.json({actividad});

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}

exports.eliminarActividad = async (req, res) => {

    try {

        const actividad = await Actividad.findById(req.params.id);

        if(actividad === null) return res.status(404).json({ msg: 'Actividad no encontrada :(' });

        await Actividad.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Actividad eliminada exitosamente!' });
        
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

}