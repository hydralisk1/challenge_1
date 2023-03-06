import { getPosts, createPost } from '@/db/post'

export default async function handler(req, res) {
  switch(req.method) {
    case 'GET':
      try{
        const posts = await getPosts(req.query.order || 'asc')
        res.status(200).json({ posts })
      }catch(err) {
        res.status(500).json({ message: 'Something went wrong' })
      }
      break
    case 'POST':
      const { title, coffee, text, rating } = req.body
      try{
        const post = await createPost({ title, coffee, text, rating })
        res.status(201).json({ post })
      }catch(err) {
        if(err.code === 'P2003') res.status(500).json({ message: `Coffee with id ${coffee} doesn\'t exist.` })
        else
          res.status(500).json({ message: 'Post title, coffee id, text, and rating are required.' })
      }
      break
    default:
      res.status(405).json({ message: `Method ${req.method} not allowed.` })
  }
}
