import { FC } from "react";
import { Panel } from ".";
import { PortalBase } from "../../util/types";
import "/src/sass/components/Dropdown.scss";

// expects to receive buttons as children
const Dropdown: FC<PortalBase> = ({ children, extraStyles = null }) => {
    return (
        <Panel extraStyles={`ui-dropdown ${extraStyles}`}>
            { children }
        </Panel>
    )
}

export default Dropdown;