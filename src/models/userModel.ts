import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "user" | "admin"
}

const userSchema = new mongoose.Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"]
    }
})

const User = mongoose.model("User", userSchema)

// export const users: User[] = [];

export default User;



