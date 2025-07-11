import mongoose from "mongoose"
import env from "dotenv"
env.config();

const mongoString = process.env.MONGO_URI;

mongoose.set("strictQuery", true);
if (!mongoString) {
    console.error("Mongostring is undefined ")
}

const connectToMongo = () => {
    mongoose
        .connect(mongoString!)
        .then((obj) => {
            console.log("--- Successfully connected with database ");
        })
        .catch((error) => {
            console.error("Invalid credentials ", error);
        });
};

export default connectToMongo;