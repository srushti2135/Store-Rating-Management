import { User, Store, Rating } from '../models/index.js';
import bcrypt from 'bcryptjs';

export async function listUsers(req, res) {
  const users = await User.findAll({ attributes: ['id','name','email','address','role'] });
  res.json(users);
}

export async function getUser(req, res) {
  const id = req.params.id;
  const user = await User.findByPk(id, { attributes: ['id','name','email','address','role'] });
  if (!user) return res.status(404).json({ message: 'Not found' });
  // if store owner, include store rating
  if (user.role === 'store_owner') {
    const stores = await Store.findAll({ where: { ownerId: user.id } });
    res.json({ ...user.toJSON(), stores });
  } else {
    res.json(user);
  }
}

export async function updatePassword(req, res) {
  const id = req.user.id;
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'Password required' });
  if (password.length < 8 || password.length > 16) return res.status(400).json({ message: 'Password length invalid' });
  const special = /[!@#$%^&*(),.?":{}|<>]/;
  const upper = /[A-Z]/;
  if (!special.test(password) || !upper.test(password)) return res.status(400).json({ message: 'Password must include at least one uppercase and one special char' });
  const hashed = await bcrypt.hash(password, 10);
  await User.update({ password: hashed }, { where: { id } });
  res.json({ message: 'Password updated' });
}