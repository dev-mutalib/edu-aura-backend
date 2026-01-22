import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = generateToken(user._id);
  res.json({ user, token });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id);
  res.json({ user, token });
};
