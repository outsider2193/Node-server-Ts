import User from "../models/userModel";
import { Request, Response } from "express";
import { zUserSchema, zLoginSchema } from "../schema/userSchema"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import env from "dotenv"

env.config();

const secretKey = process.env.JWT_SECRET;

export const registerUser = async (req: Request, res: Response) => {
    try {

        const parseResult = zUserSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ message: "validation failed" })
        }
        const { firstName, lastName, email, password, role } = parseResult.data;

        const isExisting = await User.findOne({ where: { email } });

        if (isExisting) {
            return res.status(400).json({ message: "User already exists,maybe login?" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = new User({

            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        })
        await newUsers.save();

        res.status(201).json({ message: "new user added", data: newUsers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const validatedData = zLoginSchema.safeParse(req.body);

        if (!validatedData.success) {
            return res.status(400).json({ message: "Data invalid !" })
        }
        const { email, password } = validatedData.data;

        const existingUser = await User.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials " })
        }
        const token = jwt.sign(

            { id: existingUser.id, email: existingUser.email, role: existingUser.role },
            secretKey!,
            { expiresIn: "1y" }
        )
        res.status(200).json({ message: "succesfully logged in", jwtToken: token })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
    }
}


