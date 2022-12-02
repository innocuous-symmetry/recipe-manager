import { ButtonComponent } from "../../util/types"
import "/src/sass/components/Button.scss";

const Button: ButtonComponent = ({ onClick = (() => {}), children, extraStyles, disabled = false, disabledText = null }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`ui-button ${extraStyles || ''}`}>
            { disabled ? (disabledText || children || "Button") : (children || "Button") }
        </button>
    )
}

export default Button;