import z from "zod";

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

//type interference in zod
export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})

//type interference in zod
export type SigninInput = z.infer<typeof signinInput>

export const createblogInput = z.object({
    title: z.string(),
    content: z.string()
})

//type interference in zod
export type CreateblogInput = z.infer<typeof createblogInput>

export const updateblogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

//type interference in zod
export type UpdateblogInput = z.infer<typeof updateblogInput>


