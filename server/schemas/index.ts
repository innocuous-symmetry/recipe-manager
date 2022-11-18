export interface IUser {
    firstname: string
    lastname: string
    handle: string
    email: string
    password: string
}

export interface IRecipe {
    name: string
    description?: string
    preptime: string
    ingredients: IIngredient[]
    removed: boolean
}

export interface IIngredient {
    name: string
    description?: string
    active: boolean
}

export interface ICollection {
    name: string
    owner: IUser
    active: boolean
    default: boolean
}

export interface IGroceryList {
    owner: IUser
    listname: string
    recipes?: IRecipe[]
    active: boolean
}