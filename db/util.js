import { Prisma } from "@prisma/client"
import prisma from "./prisma"

export async function getCoffees() {
  const allCoffees = await prisma.coffee.findMany({
    orderBy: [
      {
        name: 'asc'
      }
    ]
  })

  return allCoffees
}

export async function getCoffeeById(id) {
  const coffee = await prisma.coffee.findUnique({
    where: {
      id: Number(id)
    }
  })

  return coffee
}

export async function createCoffee({name, year, caffineContent, caffinePercentage}) {
  try {
    const coffee = await prisma.coffee.create({
      data: {
        name,
        year,
        caffine_content: caffineContent,
        caffine_percentage: caffinePercentage
      }
    })

    return coffee
  }catch(e) {
    if(e instanceof Prisma.PrismaClientKnownRequestError) console.log(e.message)
    throw e
  }
}

export async function deleteCoffee(id) {
  try{
    const coffee = await prisma.coffee.delete({
      where: {
        id: Number(id)
      }
    })

    return coffee
  }catch(e) {
    if(e instanceof Prisma.PrismaClientKnownRequestError) console.log(e.code)
    throw e
  }
}
