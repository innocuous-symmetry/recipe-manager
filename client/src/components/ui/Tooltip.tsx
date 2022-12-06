import { FC } from "react";
import { PortalBase } from "../../util/types";

const Tooltip: FC<PortalBase> = ({ children, extraStyles = null }) => {
    return (
        <aside className={`ui-tooltip ${extraStyles}`}>
            { children }
        </aside>
    )
}

export default Tooltip;