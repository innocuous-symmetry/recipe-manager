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
    preptime: string
    authoruserid: string | number
    cuisineid?: string | number
    courseid?: string | number
    description?: string
    ingredients?: string[]
}

export interface IIngredient extends HasHistory {
    name: string
    description?: string
    flavorprofile?: string | FlavorProfile['name']
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

export interface ICuisine extends HasHistory, CanDeactivate {
    name: string
}

export interface ICourse extends HasHistory, CanDeactivate {
    name: string
}

export interface FlavorProfile extends HasHistory, CanDeactivate {
    name: string
    description?: string
}