import styled from 'styled-components'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { categoriesState, categoryState, showAddCategoryForm } from '../atoms'

function Category() {
  const categories = useRecoilValue(categoriesState)
  const setShowAddCategoryForm = useSetRecoilState(showAddCategoryForm)
  const [category, setCategory] = useRecoilState(categoryState)
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event
    setCategory(name)
  }

  const onClickPlus = () => {
    setShowAddCategoryForm(true)
  }

  return (
    <Wrapper>
      {categories?.map((cateItem) => (
        <Btn
          name={cateItem}
          $isActive={category === cateItem}
          key={cateItem}
          onClick={onClick}
        >
          {cateItem}
        </Btn>
      ))}
      <Btn $isActive={true} onClick={onClickPlus}>
        +
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
  cursor: pointer;
`

export default Category
