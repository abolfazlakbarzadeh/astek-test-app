export type User = {
    id: number
    username: string
    name: string
    phone: string
    is_super_admin: boolean
    createdAt: string
    updatedAt: string
    role_id: number
    role: Role
}

export interface Role {
    id: number
    name: string
    permissions: string[]
    createdAt: string
    updatedAt: string
}

export type Product = {
    id: number
    name: string
    description: any
    price: number
    createdAt: string
    updatedAt: string
    role_id: any
    user_id: number
    user?: Omit<User, 'is_super_admin' | 'role_id' | 'phone'>
}