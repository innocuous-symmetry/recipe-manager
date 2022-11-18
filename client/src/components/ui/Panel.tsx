import { PanelComponent } from "../../util/types";

const Panel: PanelComponent = ({ children, extraStyles }) => {
    return (
        <div className={`panel ${extraStyles || ''}`}>
            { children || null }
        </div>
    )
}

export default Panel;