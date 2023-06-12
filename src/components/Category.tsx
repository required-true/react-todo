import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { Categories, categoryState } from '../atoms'

function Category() {
  const [category, setCategory] = useRecoilState(categoryState)
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event
    setCategory(name as any)
  }

  return (
    <Wrapper>
      <Btn
        name={Categories.TO_DO}
        $isActive={category === Categories.TO_DO}
        onClick={onClick}
      >
        Todo
      </Btn>
      <Btn
        name={Categories.DOING}
        $isActive={category === Categories.DOING}
        onClick={onClick}
      >
        Doing
      </Btn>
      <Btn
        name={Categories.DONE}
        $isActive={category === Categories.DONE}
        onClick={onClick}
      >
        Done
      </Btn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`

const Btn = styled.button<{ $isActive: boolean }>`
  border: 1px solid
    ${(props) =>
      props.$isActive ? props.theme.accentColor : props.theme.textColor};
  border-radius: 5px;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  background: transparent;
`

export default Category
