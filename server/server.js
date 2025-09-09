import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import 'dotenv/config';


const app = express();
await connectCloudinary(); 


app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.get('/', (req, res) => {
    res.send({msg: "Server is live"});
});

app.use(requireAuth());
// This middleware should come below the / route cuz, a person who is visiting our app for the first time shouldn't be directly directed towards the login page.

app.use('/api/ai', aiRouter);
app.use('/api/user', userRouter);



const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is listening on port ", PORT);
});
