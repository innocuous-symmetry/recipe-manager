import { ChangeEvent, ChangeEventHandler, Dispatch, FC, ReactNode, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/ui";
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

interface NavbarProps {
    received: IUser | undefined
    navigate: (path: string) => void
    liftChange?: (newValue: IUser | undefined) => void
}

interface CheckboxProps {
    rowid: string
    id: string
    idx: number
    label: string
    value: string
    onChange: (e: ChangeEvent<HTMLElement>, idx: number) => void
    FormElement: typeof Form
}

export type PageComponent = FC<PortalBase>
export type PanelComponent = FC<PortalBase>
export type ButtonComponent = FC<ButtonParams>
export type ProtectPortal = FC<MultiChildPortal>
export type UserCardType = FC<UserCardProps>
export type NavbarType = FC<NavbarProps>
export type CheckboxType = FC<CheckboxProps>