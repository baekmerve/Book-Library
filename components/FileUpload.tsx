'use client'

import config from '@/lib/config'
import { cn } from '@/lib/utils'
import { IKImage, IKVideo, ImageKitProvider, IKUpload } from 'imagekitio-next'
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

interface Props {
  type: 'image' | 'video'
  accept: string
  placeholder: string
  folder: string
  variant: 'dark' | 'light'
  onFileChange: (filePath: string) => void
  value?: string
}
const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef(null)

  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  })

  const [progress, setProgress] = useState(0)

  const styles = {
    button:
      variant === 'dark'
        ? 'bg-gray-900'
        : 'bg-white/90 border-gray-100 border',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-slate-700',
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    toast.error(`${type} upload failed`, {
      description: `Your ${type} could not be uploaded. Please try again.`,
    })
    console.error('🚀 - error:', error)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (response: any) => {
    setFile(response)
    onFileChange(response.filePath)

    toast.success(`${type} uploaded successfully`, {
      description: `${response.filePath} uploaded successfully!`,
    })
  }
  //validate the file type before uploading
  const onValidate = (file: File) => {
    if (type === 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast.error('File size too large', {
          description: 'Please upload a file that is less than 20MB in size',
        })
        return false
      }
    } else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast.error('File size too large', {
          description: 'Please upload a file that is less than 50MB in size',
        })
        return false
      }
    }
    return true
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
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100)

          setProgress(percent)
        }}
        folder={folder}
        accept={accept}
        className='hidden'
      />
      <button
        onClick={handleUploadClick}
        className={cn(
          'flex min-h-14 w-full items-center justify-center gap-1.5 cursor-pointer rounded-md',
          styles.button
        )}
      >
        <Image
          src='/icons/upload.svg'
          alt='upload-icon'
          width={20}
          height={20}
          className='object-contain'
        />
        <p className={cn('text-base', styles.placeholder)}>{placeholder}</p>

        {file && (
          <p className={cn('mt-1 text-center text-xs', styles.text)}>
            {file.filePath}
          </p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className='w-full rounded-full bg-green-200'>
          <div
            className='rounded-full bg-green-800 p-0.5 text-center font-bebas text-[8px] font-bold leading-none text-light-100'
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {/* showing preview of the file */}
      {file.filePath &&
        (type === 'image' ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : type === 'video' ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className='h-96 w-full rounded-xl'
          />
        ) : null)}
    </ImageKitProvider>
  )
}

export default FileUpload
