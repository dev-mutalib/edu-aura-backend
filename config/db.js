import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'edu_aura_db', // 🔥 FORCE DATABASE NAME
    });

    isConnected = true;

    console.log('✅ MongoDB Connected Successfully');
    console.log('👉 Database:', conn.connection.name);
    console.log('👉 Host:', conn.connection.host);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    throw new Error('Database connection failed');
  }
};

export default connectDB;
