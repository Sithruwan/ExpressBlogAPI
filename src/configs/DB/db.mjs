import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('blogapidb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true, // Disable logging (optional)
});

let isConnected = false; // Flag to track connection

const connectDB = async () => {
  if (isConnected) {
    console.log('🔄 Using existing database connection.');
    return sequelize;
  }
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
    isConnected = true;
    return sequelize;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

export { sequelize, connectDB };
