import express from 'express';
import { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } from '../controllers/tarea.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', obtenerTareas);
router.post('/', crearTarea);
router.put('/:id', actualizarTarea);
router.delete('/:id', eliminarTarea);

export default router;
