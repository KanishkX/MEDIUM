// import { Hono } from 'hono'
// import { decode, sign, verify } from 'hono/jwt'
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'

// const app = new Hono<{
//   Bindings: {
//     DATABASE_URL:String
//     KEY:any
//   },
//   Variables: {
//     userId: any
//   }
// }>();
// app.use("/api/v1/blog/*", async (c,next)=>{
//   const prisma = new PrismaClient({
//     //@ts-ignore
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   const header = c.req.header("authorization")|| " "
//   const verify_jwt = await verify(header.split(" ")[1], c.env.KEY);
//   const data = decode(header);
//   if(verify_jwt){
//     c.set("userId", data.payload.id);
//   }
//   await next();
// })

// app.post('/api/v1/signup', async (c) => {
//   const prisma = new PrismaClient({
//     //@ts-ignore
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   const body = await c.req.json();
//   try {
// 		const user = await prisma.user.create({
// 			data: {
// 				email: body.email,
// 				password: body.password
// 			}
// 		});
//     const jwtToken = await sign({id: user.id},c.env.KEY);
// 		return c.text('jwt here:' + jwtToken +" of id:");
  
// 	} catch(e) {
// 		return c.status(403);
// 	}

// })
// app.post('/api/v1/signin',async (c) =>{
//   const prisma = new PrismaClient({
//     //@ts-ignore
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());
//   const body = await c.req.json();
//   const user = await prisma.user.findUnique({
//     where:{
//       email: body.email
//     } 
//   });

//   if(!user){
//     c.status(403);
//     return c.json({error:"user not found"});
//   }
//   const jwtToken = await sign({id: user.id},c.env.KEY);
//   return c.json({jwtToken});
// })

// app.post('/api/v1/blog',(c)=>{
//   return c.text('Hello Hono!')
// })

// app.get('/api/v1/blog/:id',(c)=>{
//   return c.text('Hello Hono!')
// })
// app.put('/api/v1/blog',(c)=>{
//   return c.text('Hello Hono!')
// })

// exporst default app

import { Hono } from 'hono'
import { bookRouter } from './routes/blogs';
import { userRouter } from './routes/user';

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();

app.route('/api/v1/user', userRouter)
app.route('/api/v1/book', bookRouter)

export default app