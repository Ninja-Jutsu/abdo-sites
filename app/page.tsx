// import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getAllCategories } from '@/utils/actions'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'

import LinkIcon from '@/components/home/LinkIcon'
import Image from 'next/image'

export default async function Home() {
  const links = await getAllCategories()
  return (
    <div className='flex flex-wrap gap-5'>
      {links.map(({ id, name, categoryItems }) => {
        const displayLinks = []
        if (links.length > 2) {
          for (let i = 2; i > 0; i--) {
            displayLinks.push(categoryItems[i])
          }
        }
        return (
          <Popover key={id}>
            <PopoverTrigger className={`p-6 mt-4 rounded-md bg-slate-300`}>
              <h1 className='text-xl mb-4'>{name}</h1>
              <div className='flex flex-wrap gap-3'>
                {displayLinks.map(({ id: key, image }) => {
                  return (
                    <div key={key}>
                      <Image
                        src={image}
                        alt='image'
                        width={30}
                        height={30}
                        className='opacity-50'
                      />
                    </div>
                  )
                })}
              </div>
            </PopoverTrigger>
            <PopoverContent className='flex gap-4 w-[50vw] flex-wrap'>
              {categoryItems.map(({ id: key, name, image, url }) => {
                return (
                  <Card
                    key={key}
                    className='flex flex-col items-center'
                  >
                    <Link
                      href={`https://${url}`}
                      target='_blank'
                      className='block '
                    >
                      <CardContent className='w-max h-max min-h-10 min-w-10  flex p-0'>
                        <LinkIcon
                          image={image}
                          name={name}
                        />
                      </CardContent>
                    </Link>
                  </Card>
                )
              })}
            </PopoverContent>
          </Popover>
        )
      })}
    </div>
  )
}

// function getRandomColor() {
//   const randomNumber = Math.floor(Math.random() * 16777215)
//   const randomColor = '#' + randomNumber.toString(16).padStart(6, '0')
//   return randomColor
// }
