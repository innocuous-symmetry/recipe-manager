// defined shared characteristics for DB entities
interface DBEntity {
    id?: number
}

interface HasHistory extends DBEntity {
    datecreated?: string
    datemodified?: string
}

interface CanDeactivate extends DBEntity {
    active?: boolean
}

// data models
export interface IUser extends HasHistory, CanDeactivate {
    firstname: string
    lastname: string
    handle: string
    email: string
    isadmin: boolean
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
    authoruserid: string | number
}

export interface IIngredient extends HasHistory {
    name: string
    description?: string
    createdbyid: string | number
}

export interface ICollection extends HasHistory, CanDeactivate {
    name: string
    ismaincollection: boolean
    ownerid: string | number
}

export interface IGroceryList extends HasHistory, CanDeactivate {
    name: string
    ownerid: string | number
}

export interface IFriendship extends HasHistory, CanDeactivate {
    senderid: string | number
    targetid: string | number
    pending: boolean
}