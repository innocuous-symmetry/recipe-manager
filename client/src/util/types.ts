import { FC, ReactNode } from "react";

interface PortalBase {
    children?: ReactNode
    extraStyles?: string
}

interface ButtonParams extends PortalBase {
    onClick?: (params?: any) => any
}

export type PageComponent = FC<PortalBase>
export type PanelComponent = FC<PortalBase>
export type ButtonComponent = FC<ButtonParams>

export interface IUser {
    id: number
    firstname: string
    lastname: string
    handle: string
    email: string
    password: string
    active: boolean
}

export interface IRecipe {
    id: number
    name: string
    description?: string
    preptime: string
    removed: boolean
    authoruserid: IUser["id"]
}

export interface IIngredient {
    id: number
    name: string
    description?: string
}

export interface ICollection {
    id: number
    name: string
    active: string
    ismaincollection: boolean
    ownerid: IUser["id"]
}

export interface IGroceryList {
    id: number
    name: string
    recipes?: IRecipe["id"][]
    active: boolean
    ownerid: IUser["id"]
}