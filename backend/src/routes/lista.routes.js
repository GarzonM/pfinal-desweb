import express from 'express';
import { crearLista, obtenerListas, actualizarLista, eliminarLista } from '../controllers/lista.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', obtenerListas);
router.post('/', crearLista);
router.put('/:id', actualizarLista);
router.delete('/:id', eliminarLista);

export default router;