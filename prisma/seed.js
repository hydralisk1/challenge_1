const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedingCoffees() {
  const coffeeData = [{
    name: 'Ethiopia Yirgacheffe',
    year: 2020,
    caffine_content: 100,
    caffine_percentage: 1.5
  },{
    name: 'Ethiopia Sidamo',
    year: 2020,
    caffine_content: 100,
    caffine_percentage: 1.5
  },{
    name: 'Ethiopia Harrar',
    year: 2020,
    caffine_content: 100,
    caffine_percentage: 1.5
  }]

  await prisma.coffee.deleteMany({})

  const coffees = Promise.all(coffeeData.map(async (coffee) => await prisma.coffee.create({
    data: {
      name: coffee.name,
      year: coffee.year,
      caffine_content: coffee.caffine_content,
      caffine_percentage: coffee.caffine_percentage
    }
  })))

  return coffees
}

async function seedingPosts(coffees){
  const postData = [{
    title: 'Post 1',
    rating: 5,
    text: 'This is the first post',
    coffee: coffees[0].id
  },{
    title: 'Post 2',
    rating: 4,
    text: 'This is the second post',
    coffee: coffees[1].id
  },{
    title: 'Post 3',
    rating: 3,
    text: 'This is the third post',
    coffee: coffees[2].id
  }]

  await prisma.post.deleteMany({})

  const posts = Promise.all(postData.map(async (post) => await prisma.post.create({
    data: {
      title: post.title,
      rating: post.rating,
      text: post.text,
      coffee: post.coffee
    }
  })))

  return posts
}

seedingCoffees()
  .then(res => seedingPosts(res))
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
