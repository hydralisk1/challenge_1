import { Prisma } from "@prisma/client"
import prisma from "./prisma"

export async function getPosts(sortOrder) {
  const order = sortOrder === 'desc' ? 'desc' : 'asc'
  const allPosts = await prisma.post.findMany({
    include: {
      coffeeId: true
    },
    orderBy: [
      {
        createdAt: order
      }
    ]
  })

  return allPosts
}

export async function getPostById(id) {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    }
  })

  return post
}

export async function createPost({title, coffee, text, rating}) {
  try {
    const post = await prisma.post.create({
      data: {
        title,
        coffee,
        text,
        rating
      }
    })

    return post
  }catch(e) {
    if(e instanceof Prisma.PrismaClientKnownRequestError) console.log(e.code)
    throw e
  }
}

export async function deletePost(id) {
  try{
    await prisma.post.delete({
      where: {
        id: Number(id)
      }
    })
  }catch(e) {
    if(e instanceof Prisma.PrismaClientKnownRequestError) console.log(e.code)
    throw e
  }
}

export async function getPostsByCoffee({coffee, name}) {
  if(!coffee && !name) throw new Error('Coffee id or name is required.')
  const where = coffee ? { coffee: Number(coffee) } : { coffeeId: { name } }
  const posts = await prisma.post.findMany({
    where,
    orderBy: {
      createdAt: 'asc'
    }
  })

  return posts
}
