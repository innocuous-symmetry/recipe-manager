import { ButtonComponent } from "../../util/types"
import "/src/sass/components/Button.scss";

const Button: ButtonComponent = ({ onClick = (() => {}), children, extraClasses, id = null, disabled = false, disabledText = null }) => {
    if (id?.length) {
        return (
            <button id={id} onClick={onClick} disabled={disabled} className={`ui-button ${extraClasses || ''}`}>
                { disabled ? (disabledText || children || "Button") : (children || "Button") }
            </button>
        )
    }

    return (
        <button onClick={onClick} disabled={disabled} className={`ui-button ${extraClasses || ''}`}>
            { disabled ? (disabledText || children || "Button") : (children || "Button") }
        </button>
    )
}

export default Button;