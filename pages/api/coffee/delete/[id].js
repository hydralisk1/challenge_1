import { deleteCoffee } from '@/db/coffee'

export default async function handler(req, res) {
  if(req.method !== 'DELETE') res.status(405).json({ message: `Method ${req.method} not allowed.` })
  else {
    const id = req.query.id
    try{
      await deleteCoffee(id)
      res.status(200).json({ message: `Coffee with id ${id} has been successfully deleted.` })
    }catch(err) {
      err.code === 'P2025' ? res.status(404).json({ message: `Coffee with id ${id} not found.` }) : res.status(500).json({ message: 'Something went wrong' })
    }
  }
}
