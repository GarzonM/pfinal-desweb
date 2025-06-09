import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUsuarioByEmail, saveUsuario } from '../repositories/usuario.repository.js';

const SECRET = process.env.JWT_SECRET || 'secreto123';

export async function register({ nombre, email, password }) {
  if (!email || !password || !nombre) throw new Error('Campos requeridos');
  const existente = await findUsuarioByEmail(email);
  if (existente) throw new Error('Ya existe un usuario con ese email');
  const hashed = await bcrypt.hash(password, 10);
  const nuevo = await saveUsuario({ nombre, email, password: hashed });
  const token = jwt.sign({ id: nuevo.id }, SECRET);
  return { user: { id: nuevo.id, nombre: nuevo.nombre, email: nuevo.email }, token };
}

export async function login({ email, password }) {
  if (!email || !password) throw new Error('Email y contraseña requeridos');
  const usuario = await findUsuarioByEmail(email);
  if (!usuario) throw new Error('Usuario no encontrado');
  const match = await bcrypt.compare(password, usuario.password);
  if (!match) throw new Error('Contraseña incorrecta');
  const token = jwt.sign({ id: usuario.id }, SECRET);
  return { user: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }, token };
}

