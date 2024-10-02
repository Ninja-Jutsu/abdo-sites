import { SubmitButton } from '@/components/form/Buttons'
import FormContainer from '@/components/form/FormContainer'
import FormInput from '@/components/form/FormInput'
import { createCategoryAction } from '@/utils/actions'

function CreateCategory() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        create category
      </h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createCategoryAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput
              type='text'
              name='name'
              label='Category name'
            />
          </div>
          <SubmitButton
            text='Create Category'
            className='mt-8'
          />
        </FormContainer>
      </div>
    </section>
  )
}
export default CreateCategory
