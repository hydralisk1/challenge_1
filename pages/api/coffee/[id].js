import { getCoffeeById } from "@/db/coffee"

export default async function handler(req, res) {
  if(req.method === 'GET') {
    const id = req.query.id
    try{
      const coffee = await getCoffeeById(id)
      coffee === null ? res.status(404).json({ message: `Coffee with id ${id} not found.` }) : res.status(200).json({ coffee })
    }catch(err) {
      res.status(500).json({ message: 'Something went wrong' })
    }
  }else res.status(405).json({ message: `Method ${req.method} not allowed.` })
}
