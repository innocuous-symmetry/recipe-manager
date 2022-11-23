import { FC } from "react"
import { MultiChildPortal } from "../../util/types"

const Card: FC<MultiChildPortal> = ({ children = <></>, extraStyles = ""}) => {
    return (
        <div className={`ui-card ${extraStyles}`}>
            { children }
        </div>
    )
}

export default Card;