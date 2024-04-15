import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors";
import cookieParser from "cookie-parser"
import userRoutes from "./routes/auth.js"
import articleRoutes from "./routes/article.js"
import commentRoutes from "./routes/comment.js"
import likeRoutes from "./routes/like.js"
import messageRoutes from "./routes/message.js"
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig.js';
import local from './files.js';



import dotenv from 'dotenv';
dotenv.config();

const app: Express = express()
// const cors = corsMiddleware();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://derrick-nuby.github.io');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
const PORT: string | number = process.env.PORT || 4000

app.use(local)
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true // Allow credentials (cookies)
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/user', userRoutes)
app.use('/api/article', articleRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/like', likeRoutes)
app.use('/api/message', messageRoutes)
// swaggerSetup(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Brand-DB';


const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}
 
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })



export default app