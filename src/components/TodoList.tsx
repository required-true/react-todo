import styled from 'styled-components'

import CreateTodo from './CreateTodo'
import Todo from './Todo'
import { useRecoilValue } from 'recoil'
import { todoSelector } from '../atoms'
import Category from './Category'

function TodoList() {
  const todos = useRecoilValue(todoSelector)

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>To Dos</Title>
        <Category />
      </TitleWrapper>
      <hr />
      <CreateTodo />
      {todos?.map((todo) => (
        <Todo {...todo} key={todo.id} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  min-width: 300px;
  max-width: 375px;
  padding: 30px;
  margin: 100px auto 0;
  border: 1px solid ${(props) => props.theme.innerColor};
  border-radius: 5px;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  font-weight: 500;
  font-size: 21px;
  margin-right: 10px;
`

export default TodoList
