import express, { Request, Response } from "express"
import env from "dotenv"
import authRoutes from "./routes/authRoutes"
import connectToMongo from "./config/db";

const app = express();
env.config();
app.use(express.json())
connectToMongo();

const port = process.env.port;

app.get("/", (req: Request, res: Response) => {
    res.send(`server running on port ${port}`)
})

app.use("/auth", authRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});


export default app;