export default function handler(req, res) {
  req.method === 'GET' ? res.status(200).json({ status: 'good' }) : res.status(405).json({ message: `Method ${req.method} not allowed.` })
}
