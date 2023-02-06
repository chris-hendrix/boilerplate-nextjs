import formidable from 'formidable'
import type { NextApiRequest } from 'next'
import fs from 'fs'

const getFile = (req: NextApiRequest): Promise<{ filename: string, buffer: Buffer }> => (
  new Promise((resolve, reject) => {
    const form = formidable({ multiples: false })
    form.parse(req, async (err, _fields, files) => {
      if (err) reject(err)
      const file = files?.file as formidable.File
      resolve({
        filename: file.originalFilename as string,
        buffer: fs.readFileSync(file.filepath)
      })
    })
  })
)

export default getFile
