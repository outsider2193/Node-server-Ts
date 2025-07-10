import { User, users } from "../models/userModel";
import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response) => {

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "fields are empty" })
    }

    const isExisting = users.find(user => user.email === user.email);

    if (isExisting) {
        res.status(400).json({ message: "User already exists,maybe login?" })
    }
    const newUsers: User = {
        id: users.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    const userData = users.push(newUsers);
    res.status(201).json({ message: "new user added", data: userData });

}

