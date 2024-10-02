import Image from 'next/image'
import React from 'react'

export default function LinkIcon({
  image,
  name,
}: {
  image: string
  name: string
}) {
  return (
    <div className='relative w-10 h-10 object-cover overflow-hidden justify-center'>
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className='absolute top-0 right-0'
      />
    </div>
  )
}
