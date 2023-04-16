import { connect } from 'mongoose';

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI as string);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
