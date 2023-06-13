import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface ITodo {
  id: number
  category: Categories
  text: string
}

const { persistAtom: categoryPersist } = recoilPersist({
  key: 'CATEGORY',
  storage: localStorage,
})

const { persistAtom: todoPersist } = recoilPersist({
  key: 'TODO',
  storage: localStorage,
})

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
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
