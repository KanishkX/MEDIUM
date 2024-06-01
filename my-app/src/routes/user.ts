import { Hono } from 'hono'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {signupInput} from "@kanishk44/medium-common-kanishk"

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL:String
    KEY:any
  },
  Variables: {
    userId: any
  }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        return c.json({message: "input not correct"})
    }
    try {
          const user = await prisma.user.create({
              data: {
                  email: body.username,
                  password: body.password
              }
          });
      const jwtToken = await sign({id: user.id},c.env.KEY);
      return c.text(jwtToken);
    
      } catch(e) {
          return c.status(403);
      }
  
  })
userRouter.post('/signin',async (c) =>{
    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where:{
        email: body.username
      } 
    });
  
    if(!user){
      c.status(403);
      return c.json({error:"user not found"});
    }
    try {
        // Generate JWT token
        const jwtToken = await sign({ id: user.id }, c.env.KEY);
        return c.json({ jwtToken });
    } catch (error) {
        console.error("Error generating JWT token:", error);
        c.status(500);
        return c.json({ error: "Internal server error" });
    }  })