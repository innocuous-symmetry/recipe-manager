import { FC } from "react";


const Card: FC<{ children?: JSX.Element | JSX.Element[], extraClasses?: string }> = ({ children = <></>, extraClasses = ""}) => {
    return (
        <div className={`ui-card ${extraClasses}`}>
            { Array.isArray(children) ? <>{children}</> : children }
        </div>
    )
}

export default Card;