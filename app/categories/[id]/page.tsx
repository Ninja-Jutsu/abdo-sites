import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getSingleCategory } from '@/utils/actions'

import LinkIcon from '@/components/home/LinkIcon'
import { Button } from '@/components/ui/button'

export default async function CategoryDetails({
  params,
}: {
  params: { id: string }
}) {
  const category = await getSingleCategory(params.id)
  const { id, name, updatedAt, categoryItems } = category
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid w-full items-center gap-4'>
          <div className='flex gap-4 flex-wrap'>
            {categoryItems.map((item) => {
              return (
                <LinkIcon
                  key={item.id}
                  image={item.image}
                  name={item.name}
                />
              )
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Delete</Button>
        <Button>Update</Button>
      </CardFooter>
    </Card>
  )
}
