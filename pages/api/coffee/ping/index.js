export default function handler(req, res) {
  req.method !== 'GET' ? res.status(405).json({ message: `Method ${req.method} not allowed.` }) : res.status(200).json({ status: 'good' })
}
