import express, { Request, Response } from "express"
import authRoutes from "./routes/authRoutes"
const app = express();
const port = 5000;
app.use(express.json())


app.get("/", (req: Request, res: Response) => {
    res.send(`server running on port ${port}`)
})

app.use("/auth", authRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});


export default app;