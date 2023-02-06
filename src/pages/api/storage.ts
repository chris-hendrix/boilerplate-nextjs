import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/lib/supabase'
import getFile from '@/lib/file'
import { getSessionUser } from '@/lib/session'

export const config = { api: { bodyParser: false } }

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<string | Blob>
) {
  // must have session to upload
  if (!supabase) return res.status(400).json('Storage not set up')
  const bucket = process.env.NODE_ENV

  // GET file
  if (req.method === 'GET') {
    const path = req.query.path as string
    const { data, error } = await supabase.storage.from(bucket).download(path)
    if (error) return res.status(400).json('Error downloading file')
    return res.status(200).send(data)
  }

  // POST file
  if (req.method === 'POST') {
    const user = await getSessionUser(req, res)
    if (!user) return res

    const { filename, buffer } = await getFile(req)
    const path = `${user.id}/${filename}`
    const { data, error } = await supabase.storage.from(bucket).upload(path, buffer,)
    if (error) return res.status(400).json('Upload failed')
    return res.status(200).json(data.path)
  }

  return res.status(400).json('Invalid request')
}
