import { getPostsByCoffee } from '@/db/post'

export default async function handler(req, res) {
  if(req.method === 'GET') {
    const { coffee, name } = req.query

    try {
      const posts = await getPostsByCoffee({ coffee, name })
      res.status(200).json({ posts })
    }catch(err) {
      console.log(err.message)
      res.status(500).json({ message: 'Something went wrong' })
    }
  }else res.status(405).json({ message: `Method ${req.method} not allowed.` })
}
