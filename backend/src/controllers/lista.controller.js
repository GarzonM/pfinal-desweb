import * as repo from '../repositories/lista.repository.js';

export async function crearLista(req, res) {
  const { nombre } = req.body;
  const lista = { id: Date.now().toString(), nombre, usuarioId: req.user.id };
  const nueva = await repo.saveLista(lista);
  res.status(201).json(nueva);
}

export async function obtenerListas(req, res) {
  const listas = await repo.findListasByUsuarioId(req.user.id);
  res.json(listas);
}

export async function actualizarLista(req, res) {
  const { id } = req.params;
  const lista = await repo.findListaById(id);
  if (!lista || lista.usuarioId !== req.user.id) {
    return res.status(404).json({ error: 'Lista no encontrada o no autorizada' });
  }
  const actualizada = await repo.updateLista(id, req.body);
  res.json(actualizada);
}

export async function eliminarLista(req, res) {
  const { id } = req.params;
  const lista = await repo.findListaById(id);
  if (!lista || lista.usuarioId !== req.user.id) {
    return res.status(404).json({ error: 'Lista no encontrada o no autorizada' });
  }
  await repo.deleteLista(id);
  res.status(204).end();
}

