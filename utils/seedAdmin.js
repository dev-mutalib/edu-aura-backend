import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const seedFirstAdmin = async () => {
  try {
    const adminEmail = process.env.FIRST_ADMIN_EMAIL;

    if (!adminEmail) return;

    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) return;

    const hashedPassword = await bcrypt.hash(
      process.env.FIRST_ADMIN_PASSWORD,
      10,
    );

    await User.create({
      name: process.env.FIRST_ADMIN_NAME,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ FIRST ADMIN CREATED');
  } catch (err) {
    console.error('❌ ADMIN SEED ERROR:', err.message);
  }
};
