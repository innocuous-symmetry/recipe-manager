export interface IUser {
    id: string | number
    firstname: string
    lastname: string
    handle: string
    email: string
    password: string
    active: boolean
}

export interface IRecipe {
    id: string | number
    name: string
    description?: string
    preptime: string
    removed: boolean
    authoruserid: IUser["id"]
}

export interface IIngredient {
    id: string | number
    name: string
    description?: string
}

export interface ICollection {
    id: string | number
    name: string
    active: string
    ismaincollection: boolean
    owner: IUser["id"]
}

export interface IGroceryList {
    id: string | number
    owner: IUser
    listname: string
    recipes?: IRecipe["id"][]
    active: boolean
}