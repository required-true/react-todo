import { atom, selector } from 'recoil'

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

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
})

export const todoState = atom<ITodo[]>({
  key: 'todo',
  default: [],
})

export const todoSelector = selector({
  key: 'todoSelector',
  get: ({ get }) => {
    const todos = get(todoState)
    const category = get(categoryState)
    return todos.filter((todo) => todo.category === category)
  },
})
