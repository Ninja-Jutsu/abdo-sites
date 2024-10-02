import { getAllLinks } from '@/utils/actions'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import NextLink from 'next/link'
import { Link } from '@prisma/client'

export default async function LinksPage() {
  const links = await getAllLinks()
  const totalLinks = links.length
  return (
    <div>
      {totalLinks === 0 ? (
        <div className='flex flex-col justify-center items-center'>
          <h5 className='text-2xl mt-16 mb-5'>You have no links, yet</h5>
          <Button asChild>
            <NextLink href={'/admin/category'}>Create Category</NextLink>
          </Button>
        </div>
      ) : (
        <ProductsGrid links={links} />
      )}
    </div>
  )
}

function ProductsGrid({ links }: { links: Link[] }) {
  return (
    <div className='flex flex-wrap gap-5 mt-4'>
      {links.map((link) => {
        const { name, image, id, url } = link
        return (
          <a
            href={`https://${url}`}
            key={id}
            target='_blank'
            className='hover:bg-slate-100 active:bg-slate-200 overflow-hidden'
          >
            <Card className='p-0 flex flex-col items-center justify-center pt-2 rounded-none min-w-20'>
              <CardContent className='p-0'>
                <div className='relative h-10 w-10'>
                  <Image
                    src={image}
                    alt={name}
                    width={100}
                    height={100}
                    quality={100}
                    className=' absolute top-0 right-0 object-cover transform group-hover:scale-110 transition-transform duration-500'
                  />
                </div>
              </CardContent>
              <CardFooter className='p-0 mt-2  mx-2'>
                <h2 className='text-xs capitalize'>{name}</h2>
              </CardFooter>
            </Card>
          </a>
        )
      })}
    </div>
  )
}
