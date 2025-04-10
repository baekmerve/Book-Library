'use client'

import config from '@/lib/config'
import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      )
    }
    const data = await response.json()
    const { signature, expire, token } = data
    return { signature, expire, token }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`)
  }
}

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void
}) => {
  const ikUploadRef = useRef(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    toast.error('Image upload failed', {
      description: 'Your image upload failed. Please try again.',
    })
    console.log('🚀 - error:', error)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (response: any) => {
    setFile(response)
    onFileChange(response.filePath)

    toast.success('Image uploaded successfully', {
      description: `${response.filePath} uploaded successfully`,
    })
  }

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (ikUploadRef.current) {
      // @ts-expect-error: IKUpload ref doesn't match HTMLButtonElement, but still has .click()
      ikUploadRef.current?.click()
    }
  }

  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName='test-upload.png'
      />
      <button
        onClick={handleUploadClick}
        className='flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md'
      >
        <Image
          src='/icons/upload.svg'
          alt='upload-icon'
          width={20}
          height={20}
          className='object-contain'
        />
        <p className='text-base text-light-100'>Upload a file</p>
        {file && <p className='mt-1 text-center text-xs'>{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          height={300}
          width={500}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload
