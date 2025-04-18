
import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()
    const file = data.get('file') as File


    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const uploadDir = path.join(process.cwd(), 'public', 'images', 'bookCover')
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`
    const filePath = path.join(uploadDir, filename)

    // Ensuring the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    // Create a write stream and pipe the file content into it
    const fileStream = fs.createWriteStream(filePath)
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    fileStream.write(fileBuffer)
    fileStream.end()

    return NextResponse.json({
      filePath: `/images/bookCover/${filename}`,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 })
  }
}
