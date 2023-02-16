import { FC } from "react";
import { PortalBase } from "../../util/types";

const Tooltip: FC<PortalBase> = ({ children, extraClasses = null }) => {
    return (
        <aside className={`ui-tooltip ${extraClasses}`}>
            { children }
        </aside>
    )
}

export default Tooltip;