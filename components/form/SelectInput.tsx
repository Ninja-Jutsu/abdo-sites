import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Category } from '@prisma/client'
import React from 'react'

function SelectInput({ categories }: { categories: Category[] }) {
  return (
    <Select
      name='category'
      required
      defaultValue={categories[0]?.id || ''}
    >
      <SelectTrigger className='w-[180px] text-black'>
        <SelectValue placeholder='Select Category' />
      </SelectTrigger>
      <SelectContent>
        {categories.map(({ id, name }) => (
          <SelectItem
            key={id}
            value={id}
          >
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectInput
