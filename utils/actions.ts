/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'
import {
  categorySchema,
  imageSchema,
  linkSchema,
  validateWithZodSchema,
} from './schemas'
import { uploadImage } from './supabase'
import { redirect } from 'next/navigation'

function renderError(error: unknown): { message: string } {
  console.log(error)
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  }
}

export async function getAllLinks() {
  const links = await prisma.link.findMany()
  console.log(links)
  return links
}

export async function getSingleLink(linkId: string) {
  const link = await prisma.link.findUnique({
    where: {
      id: linkId,
    },
  })

  if (!link) {
    redirect('/products')
  }
  return link
}

export async function createLinkAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string }> {
  try {
    const rawData = Object.fromEntries(formData)

    // Validate data
    const validatedFields = validateWithZodSchema(linkSchema, rawData)
    // Validate Image
    const file = formData.get('image') as File
    const categoryId = formData.get('category') as string
    const validatedFile = validateWithZodSchema(imageSchema, { image: file })

    const imageFullPath = await uploadImage(validatedFile.image)
    await prisma.link.create({
      data: {
        ...validatedFields,
        image: imageFullPath,
        category: {
          connect: { id: categoryId },
        },
      },
    })
    revalidatePath('/', 'layout')
    return { message: 'image created' }
  } catch (error) {
    return renderError(error)
  }
}

// Categories
export async function createCategoryAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string }> {
  try {
    const rawData = Object.fromEntries(formData)

    // Validate data
    const validatedFields = validateWithZodSchema(categorySchema, rawData)

    await prisma.category.create({
      data: {
        ...validatedFields,
      },
    })
    revalidatePath('/', 'layout')
    return { message: 'product created' }
  } catch (error) {
    return renderError(error)
  }
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      categoryItems: true,
    },
  })
}

export async function getSingleCategory(categoryId: string) {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      categoryItems: true,
    },
  })
  if (!category) {
    redirect('/products')
  }
  return category
}

export async function deleteCategory({ categoryId }: { categoryId: string }) {
  await prisma.category.delete({ where: { id: categoryId } })
  revalidatePath('/categories', 'layout')
  return { message: 'Category deleted successfully' }
}

// export async function updateCategory({ categoryId }: { categoryId: string }) {
//   await prisma.category.update({
//     where: { id: categoryId },
//     data: {
//       name: newName,
//     },
//   })
//   revalidatePath('/categories', 'layout')
//   return { message: 'Category deleted successfully' }
// }
