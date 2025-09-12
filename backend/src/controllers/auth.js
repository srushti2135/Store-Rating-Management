import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();

export async function signup(req, res) {
  try {
    const { name, email, password, address, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    // validations
    if (name.length < 20 || name.length > 60) return res.status(400).json({ message: 'Name length invalid' });
    if (password.length < 8 || password.length > 16) return res.status(400).json({ message: 'Password length invalid' });
    const special = /[!@#$%^&*(),.?":{}|<>]/;
    const upper = /[A-Z]/;
    if (!special.test(password) || !upper.test(password)) return res.status(400).json({ message: 'Password must include at least one uppercase and one special char' });
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already used' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, address, role: role || 'user' });
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid creds' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid creds' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}