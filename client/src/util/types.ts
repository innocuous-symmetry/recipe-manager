import { FC, ReactNode } from "react";

interface PortalBase {
    children?: ReactNode
    extraStyles?: string
}

export type PageComponent = FC<PortalBase>
export type PanelComponent = FC<PortalBase>