import { getSingleLink } from '@/utils/actions'
import Image from 'next/image'

async function SingleLinkPage({ params }: { params: { id: string } }) {
  const link = await getSingleLink(params.id)
  const { name, image } = link

  return (
    <section>
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        <div className='relative h-full'>
          <Image
            src={image}
            alt={name}
            fill
            sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw'
            priority
            className='w-full rounded-md object-cover'
          />
        </div>
        <div>
          <div className='flex justify-between items-center'>
            <h1 className='capitalize text-3xl font-bold'>{name}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SingleLinkPage
