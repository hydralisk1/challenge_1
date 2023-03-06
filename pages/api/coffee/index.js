import { getCoffees } from "@/db/coffee"

export default async function handler(req, res) {
  if(req.method !== 'GET') res.status(405).json({ message: `Method ${req.method} not allowed.` })
  else {
    const coffees = await getCoffees(req.body.order || 'asc')
    res.status(200).json({ coffees })
  }
}
