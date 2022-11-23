interface HasHistory {
    datecreated?: string
    datemodified?: string
}

interface CanDeactivate {
    active?: boolean
}

interface DBEntity {
    id?: number
}

export interface IUser extends DBEntity, HasHistory, CanDeactivate {
    firstname: string
    lastname: string
    handle: string
    email: string
    password?: string
}

export interface IUserAuth {
    email: string
    password: string
}

export interface IRecipe extends DBEntity, HasHistory, CanDeactivate {
    name: string
    description?: string
    preptime: string
    authoruserid?: IUser["id"]
}

export interface IIngredient extends DBEntity, HasHistory {
    name: string
    description?: string
}

export interface ICollection extends DBEntity, HasHistory, CanDeactivate {
    name: string
    ismaincollection: boolean
    ownerid?: IUser["id"]
}

export interface IGroceryList extends DBEntity, HasHistory, CanDeactivate {
    name: string
    ownerid?: IUser["id"]
}