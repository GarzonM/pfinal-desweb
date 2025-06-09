let listas = [];

export async function saveLista(lista) {
  listas.push(lista);
  return lista;
}

export async function findListasByUsuarioId(usuarioId) {
  return listas.filter(l => l.usuarioId === usuarioId);
}

export async function findListaById(id) {
  return listas.find(l => l.id === id);
}

export async function updateLista(id, data) {
  const index = listas.findIndex(l => l.id === id);
  if (index === -1) return null;
  listas[index] = { ...listas[index], ...data };
  return listas[index];
}

export async function deleteLista(id) {
  listas = listas.filter(l => l.id !== id);
}

