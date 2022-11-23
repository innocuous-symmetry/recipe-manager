interface HasHistory extends DBEntity {
    datecreated?: string
    datemodified?: string
}

interface CanDeactivate extends DBEntity {
    active?: boolean
}

interface DBEntity {
    id?: number
}

export interface IUser extends HasHistory, CanDeactivate {
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

export interface IRecipe extends HasHistory, CanDeactivate {
    name: string
    description?: string
    preptime: string
    authoruserid?: IUser["id"]
}

export interface IIngredient extends HasHistory {
    name: string
    description?: string
}

export interface ICollection extends HasHistory, CanDeactivate {
    name: string
    ismaincollection: boolean
    ownerid?: IUser["id"]
}

export interface IGroceryList extends HasHistory, CanDeactivate {
    name: string
    ownerid?: IUser["id"]
}