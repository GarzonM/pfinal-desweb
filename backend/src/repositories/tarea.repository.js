let tareas = [];

export async function saveTarea(tarea) {
  tareas.push(tarea);
  return tarea;
}

export async function findTareasByUsuarioId(usuarioId) {
  return tareas.filter(t => t.usuarioId === usuarioId);
}

export async function findTareaById(id) {
  return tareas.find(t => t.id === id);
}

export async function updateTarea(id, data) {
  const index = tareas.findIndex(t => t.id === id);
  if (index === -1) return null;
  tareas[index] = { ...tareas[index], ...data };
  return tareas[index];
}

export async function deleteTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
}
