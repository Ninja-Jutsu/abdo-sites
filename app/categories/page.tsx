import { IconButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import LinkIcon from '@/components/home/LinkIcon'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteCategory, getAllCategories } from '@/utils/actions'
import Link from 'next/link'

export default async function CategoriesPage() {
  const categories = await getAllCategories()
  const totalLinks = categories.length
  if (totalLinks === 0) {
    return (
      <div>
        <h5 className='text-2xl mt-16'>You have no categories, yet</h5>
        <Button asChild>
          <Link href={'/admin/category'}>Create Category</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className='flex gap-5 flex-wrap mt-4'>
      {categories.map(({ id, name, categoryItems }) => {
        return (
          <Card
            className='w-[350px]'
            key={id}
          >
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
            <CardFooter className='flex justify-end'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='outline'>Delete</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This actions cannot be undone. You will lose all saved
                      links
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DeleteCategory categoryId={id} />
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

const DeleteCategory = ({ categoryId }: { categoryId: string }) => {
  const deleteCategoryAction = deleteCategory.bind(null, { categoryId })
  return (
    <FormContainer action={deleteCategoryAction}>
      <IconButton actionType='delete' />
    </FormContainer>
  )
}

// const UpdateCategory = ({ categoryId }: { categoryId: string }) => {
//   const updateCategoryAction = updateCategory.bind(null, { categoryId })
//   return (
//     <FormContainer action={updateCategoryAction}>
//       <IconButton actionType='edit' />
//     </FormContainer>
//   )
// }
