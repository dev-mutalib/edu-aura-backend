import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/* ================= REGISTER (STUDENT ONLY) ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'student',
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    user.password = undefined;

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Register failed' });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    user.password = undefined;

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

/* ================= CREATE ADMIN (ADMIN ONLY) ================= */
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    admin.password = undefined;

    res.status(201).json({ admin });
  } catch (err) {
    res.status(500).json({ message: 'Admin creation failed' });
  }
};

/* ================= REGISTER ADMIN (DEV ONLY) ================= */
export const registerAdminDev = async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ message: 'Not allowed' });
  }

  const { name, email, password } = req.body;

  if (await User.findOne({ email })) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'admin',
  });

  admin.password = undefined;

  res.status(201).json({ admin });
};
