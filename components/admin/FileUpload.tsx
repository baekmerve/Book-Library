import { UploadIcon } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'


type Props = {
  onFileChange: (fileUrl: string) => void
  value?: string | undefined
}

const FileUpload = ({ onFileChange, value }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  console.log('🚀 - value:', value)
  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (fileInputRef.current) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (response.ok) {
      onFileChange(data.filePath)
    } else {
      toast.error('Upload failed', {
        description: data.error || 'An error occurred during the upload.',
      })
    }
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='hidden'
      />

      <Button
        onClick={handleUploadClick}
        className=' flex min-h-14 w-full items-center justify-center gap-1.5 cursor-pointer rounded-md '
      >
        <UploadIcon className='size-6 text-gray-500 ' />
        <p className='text-base'>Upload a book cover</p>
        {value && <p className='mt-1 text-center text-xs'>{value}</p>}
      </Button>
      {/* showing preview of the file */}
      {value && (
        <Image
          src={value}
          alt='Cover Image'
          width={300}
          height={500}
          className='rounded-xl mt-10 shadow-md'
        />
      )}
    </div>
  )
}

export default FileUpload
