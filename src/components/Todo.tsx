import styled from 'styled-components'
import { Categories, ITodo, todoState } from '../atoms'
import { useSetRecoilState } from 'recoil'

function Todo({ id, category, text }: ITodo) {
  const setToDos = useSetRecoilState(todoState)
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id)
      const newToDo = { text, id, category: name as any }
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ]
    })
  }

  return (
    <Wrapper>
      <span>{text}</span>
      <Btns>
        {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            Done
          </button>
        )}
      </Btns>
    </Wrapper>
  )
}

const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  margin-bottom: 5px;
  border-bottom: 1px solid ${(props) => props.theme.innerColor};
  list-style: none;

  & > span {
    overflow: hidden;
    max-width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`
const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 30px;
    border: 1px solid ${(props) => props.theme.innerColor};
    border-radius: 5px;
    color: ${(props) => props.theme.textColor};
    background-color: transparent;
    cursor: pointer;
  }
`

export default Todo
