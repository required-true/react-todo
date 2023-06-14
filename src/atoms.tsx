import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

export const defaultCategoreis: string[] = ['Todo', 'Doing', 'Done']

export interface ITodo {
  id: number
  category: string
  text: string
}

const { persistAtom: categoriesPersist } = recoilPersist({
  key: 'CATEGORIES',
  storage: localStorage,
})

const { persistAtom: categoryPersist } = recoilPersist({
  key: 'CATEGORY',
  storage: localStorage,
})

const { persistAtom: todoPersist } = recoilPersist({
  key: 'TODO',
  storage: localStorage,
})

export const showAddCategoryForm = atom<boolean>({
  key: 'addCategoryForm',
  default: false,
})

export const categoriesState = atom<string[]>({
  key: 'categories',
  default: defaultCategoreis,
  effects_UNSTABLE: [categoriesPersist],
})

export const categoryState = atom<string>({
  key: 'category',
  default: 'Todo',
  effects_UNSTABLE: [categoryPersist],
})

export const todoState = atom<ITodo[]>({
  key: 'todo',
  default: [],
  effects_UNSTABLE: [todoPersist],
})

export const todoSelector = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const todos = get(todoState)
    const category = get(categoryState)
    return todos.filter((todo) => todo.category === category)
  },
})
