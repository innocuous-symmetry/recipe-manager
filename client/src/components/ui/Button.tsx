import { ButtonComponent } from "../../util/types"
import "/src/sass/components/Button.scss";

const Button: ButtonComponent = ({ onClick = (() => {}), children, extraStyles }) => {
    return (
        <button onClick={onClick} className={`ui-button ${extraStyles || ''}`}>
            { children || "Button" }
        </button>
    )
}

export default Button;