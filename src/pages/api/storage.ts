import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/lib/supabase'
import getFile from '@/lib-server/file'
import { getSessionUser } from '@/lib-server/session'

export const config = { api: { bodyParser: false } }

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<{ path: string } | string | Blob>,
) {
  // must have session to upload
  if (!supabase) return res.status(400).json('Storage not set up')
  const bucket = process.env.NODE_ENV

  // GET file
  if (req.method === 'GET') {
    const path = req.query.path as string
    const { data, error } = await supabase.storage.from(bucket).download(path)
    if (error) return res.status(400).json('Error downloading file')
    res.writeHead(200, {
      'Content-Type': data.type,
      'Content-Length': data.size
    })
    const arrayBuffer = await data.arrayBuffer()
    return res.end(Buffer.from(arrayBuffer))
  }

  // POST file
  if (req.method === 'POST') {
    const user = await getSessionUser(req, res)
    if (!user) return res

    const { filename, buffer, mimetype } = await getFile(req)
    const path = `${user.id}/${filename}`
    const { data, error } = await supabase.storage
      .from(bucket).upload(path, buffer, { contentType: mimetype, upsert: true })

    if (error) return res.status(400).json(`Upload failed: ${error.message}`)
    return res.status(200).json({ path: data.path })
  }

  return res.status(400).json('Invalid request')
}
