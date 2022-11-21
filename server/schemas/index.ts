export interface IUser {
    id?: number
    firstname: string
    lastname: string
    handle: string
    email: string
    password: string
    active: boolean
}

export interface IRecipe {
    id?: number
    name: string
    description?: string
    preptime: string
    removed: boolean
    authoruserid?: IUser["id"]
}

export interface IIngredient {
    id?: number
    name: string
    description?: string
}

export interface ICollection {
    id?: number
    name: string
    active: string
    ismaincollection: boolean
    ownerid?: IUser["id"]
}

export interface IGroceryList {
    id?: number
    name: string
    recipes?: IRecipe["id"][]
    active: boolean
    ownerid?: IUser["id"]
}

export interface IUserAuth {
    email: string
    password: string
}