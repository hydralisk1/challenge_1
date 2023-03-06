import { createCoffee } from '@/db/coffee'

export default async function handler(req, res) {
  if(req.method !== 'POST') res.status(405).json({ message: `Method ${req.method} not allowed.` })
  else {
    const { name, year, caffineContent, caffinePercentage } = req.body
    try{
      const coffee = await createCoffee({ name, year, caffineContent, caffinePercentage })
      res.status(201).json({ coffee })
    }catch(err) {
      res.status(500).json({ message: 'Coffee name, year, caffine content, and caffine percentage are required.' })
    }
  }
}
