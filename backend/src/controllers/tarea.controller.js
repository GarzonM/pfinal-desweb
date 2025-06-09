import * as repo from '../repositories/tarea.repository.js';
import { findListaById } from '../repositories/lista.repository.js';

export async function crearTarea(req, res) {
  const { titulo, listaId } = req.body;
  const lista = await findListaById(listaId);
  if (!lista || lista.usuarioId !== req.user.id) {
    return res.status(400).json({ error: 'Lista inválida o no autorizada' });
  }
  const tarea = { id: Date.now().toString(), titulo, listaId, usuarioId: req.user.id };
  const nueva = await repo.saveTarea(tarea);
  res.status(201).json(nueva);
}

export async function obtenerTareas(req, res) {
  const tareas = await repo.findTareasByUsuarioId(req.user.id);
  res.json(tareas);
}

export async function actualizarTarea(req, res) {
  const { id } = req.params;
  const tarea = await repo.findTareaById(id);
  if (!tarea || tarea.usuarioId !== req.user.id) {
    return res.status(404).json({ error: 'Tarea no encontrada o no autorizada' });
  }
  const actualizada = await repo.updateTarea(id, req.body);
  res.json(actualizada);
}

export async function eliminarTarea(req, res) {
  const { id } = req.params;
  const tarea = await repo.findTareaById(id);
  if (!tarea || tarea.usuarioId !== req.user.id) {
    return res.status(404).json({ error: 'Tarea no encontrada o no autorizada' });
  }
  await repo.deleteTarea(id);
  res.status(204).end();
}

