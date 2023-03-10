import formidable from 'formidable'
import type { NextApiRequest } from 'next'
import fs from 'fs'

const getFile = (req: NextApiRequest): Promise<{
  filename: string, buffer: Buffer, mimetype: string
}> => (
  new Promise((resolve, reject) => {
    const form = formidable({ multiples: false })
    form.parse(req, async (err, _fields, files) => {
      if (err) reject(err)
      const file = files?.file as formidable.File
      resolve({
        filename: file.originalFilename || 'untitled',
        buffer: fs.readFileSync(file.filepath),
        mimetype: file.mimetype || ''
      })
    })
  })
)

export default getFile
