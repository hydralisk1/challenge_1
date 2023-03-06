import { getPostById, deletePost } from '@/db/post'

export default async function handler(req, res) {
  const id = req.query.id

  switch(req.method) {
    case 'GET':
      try{
        const post = await getPostById(id)
        post === null ? res.status(404).json({ message: `Post with id ${id} not found.` }) : res.status(200).json({ post })
      }catch(err) {
        res.status(500).json({ message: 'Something went wrong' })
      }
      break
    case 'DELETE':
      try{
        await deletePost(id)
        res.status(200).json({ message: `Post with id ${id} has been successfully deleted.` })
      }catch(err) {
        err.code === 'P2025' ? res.status(404).json({ message: `Post with id ${id} not found.` }) : res.status(500).json({ message: 'Something went wrong' })
      }
      break
    default:
      res.status(405).json({ message: `Method ${req.method} not allowed.` })
  }
}
