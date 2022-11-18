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