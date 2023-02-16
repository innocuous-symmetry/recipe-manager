import { PanelComponent } from "../../util/types";
import "/src/sass/components/Panel.scss";

const Panel: PanelComponent = ({ children, extraClasses, id }) => {
    if (id) {
        return (
            <div id={id} className={`Panel ${extraClasses || ''}`}>
                { children || null }
            </div>
        )
    } else {
        return (
            <div className={`Panel ${extraClasses || ''}`}>
                { children || null }
            </div>
        )
    }
}

export default Panel;