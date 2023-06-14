import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { categoriesState, categoryState, showAddCategoryForm } from '../atoms'
import { styled } from 'styled-components'

interface IForm {
  category: string
}

function AddCategoryForm() {
  const { register, handleSubmit, setValue } = useForm<IForm>()
  const setCategories = useSetRecoilState(categoriesState)
  const setCategory = useSetRecoilState(categoryState)
  const setShowAddCategoryForm = useSetRecoilState(showAddCategoryForm)
  const handleValid = ({ category }: IForm) => {
    setCategories((oldCategories) => {
      if (oldCategories.includes(category)) {
        alert('This category name already exists.')
        return oldCategories
      }
      return [...oldCategories, category]
    })
    setCategory(category)
    setValue('category', '')
    setShowAddCategoryForm(false)
  }

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('category')}
        placeholder="Input your custom category name."
      />
      <button>Add</button>
    </Form>
  )
}

const Form = styled.form`
  overflow: hidden;
  position: relative;
  height: 50px;
  margin: 15px 0;
  border: 1px solid ${(props) => props.theme.innerColor};
  border-radius: 5px;

  & > input {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 50px 0 10px;
    outline: none;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
    background: transparent;

    &::placeholder {
      color: #bbb;
    }
  }
  & > button {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 100%;
    border: none;
    border-left: 1px solid #eee;
    background: transparent;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
  }
`

export default AddCategoryForm
