import { FC } from "react";
import "/src/sass/components/Toast.scss";

type StyleVariant = "success" | "fail" | "warning"

interface ToastProps {
    children: JSX.Element | JSX.Element[]
    variant?: StyleVariant
}

const Toast: FC<ToastProps> = ({ children, variant = "success" }) => {
    return (
        <div className={`ui-component-toast toast-variant-${variant}`}>
            { children }
        </div>
    )
}

export default Toast;
