import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn =await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    // console.log(`MongoDB connected successfully ${conn.connection.host}`);
    console.log(`MongoDB connected successfully `);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
}