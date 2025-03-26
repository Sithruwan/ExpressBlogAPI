import "reflect-metadata";
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { connectDB } from './src/configs/DB/db.mjs'
import syncDB from './src/configs/DB/syncDB.mjs'
import indexRoute from './src/routes/IndexRoutes.mjs'


const app = express()

await connectDB();

const port = process.env.APP_PORT || 8000
const host = process.env.APP_HOST || 'localhost'
const base_url = process.env.BASE_URL || '/api/v1'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

const startServer = async () => {
    try {
      await connectDB();
  
      await syncDB();
      

      app.use(base_url,indexRoute)
  
      app.listen(port, () => {
        console.log(`Server is listening on port http://${host}:${port} 🚀`);
      });
    } catch (error) {
      console.error("❌ Error starting the server:", error);
    }
  };
  
  startServer();