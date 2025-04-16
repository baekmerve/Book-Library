import { ReactNode } from 'react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { bookSchema } from '@/lib/validations'


type FormValues = z.infer<typeof bookSchema>

type FormFieldWrapperProps = {
  control: Control<FormValues>
  name: FieldPath<FormValues>
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (field: any) => ReactNode // or refine the type later
}

export const FormFieldWrapper = ({
  control,
  name,
  label,
  children,
}: FormFieldWrapperProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex flex-col gap-1'>
        <FormLabel className='text-base font-normal text-[#0f172a]'>
          {label}
        </FormLabel>
        <FormControl>{children(field)}</FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
