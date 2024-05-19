
  import { Hono } from 'hono'
  import { decode, sign, verify } from 'hono/jwt'
  import { PrismaClient } from '@prisma/client/edge'
  import { withAccelerate } from '@prisma/extension-accelerate'
  
  export const bookRouter = new Hono<{
    Bindings: {
      DATABASE_URL:String
      KEY:any
    },
    Variables: {
      userId: any
    }
  }>();
  bookRouter.use("/*", async (c, next) => {
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const header = c.req.header("authorization") || " ";
    const token = header.split(" ")[1]; // Extract token from "Bearer <token>"
    
    if (!token) {
        return c.text("Authorization token missing");
    }

    try {
        const decodedToken = await verify(token, c.env.KEY);
        c.set("userId", decodedToken.id);
        await next();
    } catch (error) {
        return c.text("Invalid or expired token " +token );
    }

    
});
  
  bookRouter.put('/blog',async (c)=>{
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.get("userId");
    const body = await c.req.json();
    prisma.post.update({
        where:{
            id:body.id,
            authorId:id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })


  })
  bookRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany();
	return c.json({posts});
})
  bookRouter.post('/', async (c)=>{
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = await c.get("userId");
    const body = await c.req.json();
    
    const post = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }
    })

    if(!post){
        return c.json({
            message: "Post did not work"
        })
    }
    return c.json({
        id: post.id
    })
  })

  bookRouter.get('/:id',async (c)=>{
    const id = await c.req.param('id');
	const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id: id
		}
	});

	return c.json(post);
  })

