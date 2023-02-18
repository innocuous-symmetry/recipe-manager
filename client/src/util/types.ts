import { ChangeEvent, ChangeEventHandler, Dispatch, FC, ReactNode, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/ui";
import { IUser } from "../schemas";

export interface PortalBase {
    children?: ReactNode | ReactNode[]
    extraClasses?: string
    id?: string
}

interface ButtonParams extends PortalBase {
    onClick?: (params?: any) => any
    disabled?: boolean
    disabledText?: string
}

export interface AccessRules {
    mustBeRecipinAdmin: boolean
    mustBeFriend: boolean
    mustBeSubscribed: boolean
}

export interface ProtectParams extends PortalBase {
    redirect?: string
    accessRules?: AccessRules | null
}

interface UserCardProps extends PortalBase {
    targetUser: IUser
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

/**
 * Type declaration for react-select dropdown options
 */
export interface OptionType {
    value: number
    label: string
}

export type PageComponent = FC<PortalBase>
export type PanelComponent = FC<PortalBase>
export type ButtonComponent = FC<ButtonParams>
export type ProtectPortal = FC<ProtectParams>
export type UserCardType = FC<UserCardProps>
export type NavbarType = FC<NavbarProps>
export type CheckboxType = FC<CheckboxProps>

export interface TokenType {
    user: IUser
}