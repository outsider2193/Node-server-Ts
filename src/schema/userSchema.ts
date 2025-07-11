import * as z from "zod";

export const zUserSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string(),
    email: z.email(),
    password: z.string().min(1),
    role: z.enum(["user", "admin"])
})

export const zLoginSchema = z.object({
    email: z.email(),
    password: z.string().min(1)
})

type zUser = z.infer<typeof zUserSchema>

