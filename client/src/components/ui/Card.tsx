import { FC } from "react";


const Card: FC<{ children?: JSX.Element | JSX.Element[], extraStyles?: string }> = ({ children = <></>, extraStyles = ""}) => {
    return (
        <div className={`ui-card ${extraStyles}`}>
            { Array.isArray(children) ? <>{children}</> : children }
        </div>
    )
}

export default Card;