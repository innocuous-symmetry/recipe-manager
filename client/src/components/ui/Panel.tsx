import { PanelComponent } from "../../util/types";
import "/src/sass/components/Panel.scss";

const Panel: PanelComponent = ({ children, extraStyles }) => {
    return (
        <div className={`Panel ${extraStyles || ''}`}>
            { children || null }
        </div>
    )
}

export default Panel;