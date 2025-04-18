'use client'
import { Book } from '@/lib/types'
import { bookSchema } from '@/lib/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import { Input } from '../ui/input'
import ColorPicker from './ColorPicker'

import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { FormFieldWrapper } from './FormFieldWrapper'
import { createBook } from '@/lib/actions/admin-actions'
import { toast } from 'sonner'
import FileUpload from './FileUpload'


interface Props extends Partial<Book> {
  type: 'create' | 'update'
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BookForm = ({ type }: Props) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      description: '',
      author: '',
      genre: '',
      rating: 1.0,
      totalCopies: 1,
      coverUrl: '',
      coverColor: '',
      summary: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof bookSchema>) => {
    const result = await createBook(values)
    if (result.success) {
      toast.success('Success', {
        description: 'Book created successfully',
      })
      //show the book details on success
      router.push(`/admin/books/${result.data.id}`)
    } else {
      toast.error('Error', {
        description: result.message,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormFieldWrapper
          control={form.control}
          name='title'
          label='Book Title'
        >
          {(field) => (
            <Input
              required
              placeholder='Book title'
              {...field}
              className='book-form_input min-h-14'
            />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper control={form.control} name='author' label='Author'>
          {(field) => (
            <Input
              required
              placeholder='Book author'
              {...field}
              className='book-form_input min-h-14 '
            />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper control={form.control} name='genre' label='Genre'>
          {(field) => (
            <Input
              required
              placeholder='Book genre'
              {...field}
              className='book-form_input min-h-14 '
            />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper control={form.control} name='rating' label='Rating'>
          {(field) => (
            <Input
              type='number'
              min={1}
              max={5}
              placeholder='Book rating'
              {...field}
              className='book-form_input min-h-14 '
            />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper
          control={form.control}
          name='totalCopies'
          label='Total Copies'
        >
          {(field) => (
            <Input
              type='number'
              min={1}
              max={10000}
              placeholder='Total copies'
              {...field}
              className='book-form_input min-h-14  '
            />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper
          control={form.control}
          name='coverUrl'
          label='Book Image'
        >
          {(field) => (
            <FileUpload onFileChange={field.onChange} value={field.value} />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper
          control={form.control}
          name='coverColor'
          label='Primary Color'
        >
          {(field) => (
            <ColorPicker onPickerChange={field.onChange} value={field.value} />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper
          control={form.control}
          name='description'
          label='Book description'
        >
          {(field) => (
            <Textarea
              placeholder='Book description'
              {...field}
              rows={10}
              className='h-52 book-form_input '
            />
          )}
        </FormFieldWrapper>

        <FormFieldWrapper
          control={form.control}
          name='summary'
          label='Book Summary'
        >
          {(field) => (
            <Textarea
              placeholder='Book summary'
              {...field}
              rows={5}
              className='book-form_input h-32 '
            />
          )}
        </FormFieldWrapper>

        <Button
          type='submit'
          className='min-h-14 w-full bg-primary-admin hover:bg-primary-admin/95 text-white cursor-pointer'
        >
          Add Book to Library
        </Button>
      </form>
    </Form>
  )
}

export default BookForm
