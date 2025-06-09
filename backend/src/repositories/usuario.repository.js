let usuarios = [];

export async function findUsuarios() {
  return usuarios;
}

export async function findUsuarioByEmail(email) {
  return usuarios.find(u => u.email === email);
}

export async function saveUsuario(data) {
  const nuevo = { id: Date.now().toString(), ...data };
  usuarios.push(nuevo);
  return nuevo;
}

export async function deleteUsuarioById(id) {
  usuarios = usuarios.filter(u => u.id !== id);
}

export async function updateUsuarioById(id, data) {
  const index = usuarios.findIndex(u => u.id === id);
  if (index === -1) return null;
  usuarios[index] = { ...usuarios[index], ...data };
  return usuarios[index];
}

