import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import ImageInput from '@/components/form/ImageInput'
import { createLinkAction, getAllCategories } from '@/utils/actions'
import SelectInput from '@/components/form/SelectInput'

async function CreateLink() {
  const categories = await getAllCategories()
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>create link</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createLinkAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput
              type='text'
              name='name'
              label='Link name'
            />
            <FormInput
              type='text'
              name='url'
              label='Link URL'
            />
            <ImageInput />
            <SelectInput categories={categories} />
          </div>
          <SubmitButton
            text='Create Link'
            className='mt-8'
          />
        </FormContainer>
      </div>
    </section>
  )
}
export default CreateLink
