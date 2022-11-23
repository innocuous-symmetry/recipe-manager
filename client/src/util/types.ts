import { FC, ReactNode } from "react";
import { IUser } from "../schemas";

interface PortalBase {
    children?: ReactNode
    extraStyles?: string
}

interface ButtonParams extends PortalBase {
    onClick?: (params?: any) => any
}

export interface MultiChildPortal extends PortalBase {
    children?: ReactNode | ReactNode[]
}

interface UserCardProps extends PortalBase {
    user: IUser
}

export type PageComponent = FC<PortalBase>
export type PanelComponent = FC<PortalBase>
export type ButtonComponent = FC<ButtonParams>
export type ProtectPortal = FC<MultiChildPortal>
export type UserCardType = FC<UserCardProps>