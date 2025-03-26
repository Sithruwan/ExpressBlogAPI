import { sequelize } from "./db.mjs";
import User from "../../models/User.model.mjs";
import Post from "../../models/Post.model.mjs";


const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('🔄 Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Database synchronization failed:', error);
    throw error;
  }
};


export default syncDB;