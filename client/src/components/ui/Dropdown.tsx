import { FC } from "react";
import { Panel } from ".";
import { PortalBase } from "../../util/types";
import "/src/sass/components/Dropdown.scss";

// expects to receive buttons as children
const Dropdown: FC<PortalBase> = ({ children, extraClasses = null }) => {
    return (
        <Panel extraClasses={`ui-dropdown ${extraClasses}`}>
            { children }
        </Panel>
    )
}

export default Dropdown;