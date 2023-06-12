import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { categoryState, todoState } from '../atoms'

interface IForm {
  todo: string
}

function CreateTodo() {
  const { register, handleSubmit, setValue } = useForm<IForm>()
  const setTodos = useSetRecoilState(todoState)
  const category = useRecoilValue(categoryState)

  const handleValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => [
      { id: Date.now(), category, text: todo },
      ...oldTodos,
    ])
    setValue('todo', '')
  }
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input {...register('todo')} placeholder="Write a to do..." />
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

export default CreateTodo
