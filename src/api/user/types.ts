export interface User {
  id: number
  name: string
  email: string
}

export interface UserDetail extends User {
  age: number
  phone: string
}
