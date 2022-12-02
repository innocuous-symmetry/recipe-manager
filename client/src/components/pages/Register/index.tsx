import { FC, useCallback, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { IUser } from "../../../schemas";
import { Page } from "../../ui";
import AboutYou from "./aboutyou";
import AddFriends from "./addfriends";
import InitialCollection from "./collection";
import FinishUp from "./finishup";

export type RegisterVariantType = FC<{
    transitionDisplay: ((variant: number, input?: IUser) => void),
    receiveChange?: (change: IUser) => void
    input?: IUser
}>

export enum VariantLabel {
    AboutYou,
    InitialCollection,
    AddFriends,
    FinishUp
}

const Register: FC<{receiveChange: (change: IUser) => void}> = ({ receiveChange }) => {
    const [displayed, setDisplayed] = useState<JSX.Element>();
    const authContext = useAuthContext();

    const transitionDisplay = (variant: number | VariantLabel, user?: IUser) => {
        switch (variant) {
            case 0:
                setDisplayed(<AboutYou transitionDisplay={transitionDisplay} />);
                break;
            case 1:
                setDisplayed(<InitialCollection transitionDisplay={transitionDisplay} input={user} receiveChange={receiveChange} />);
                break;
            case 2:
                setDisplayed(<AddFriends transitionDisplay={transitionDisplay} input={user} />);
                break;
            case 3:
                setDisplayed(<FinishUp transitionDisplay={transitionDisplay} />);
                break;
            default:
                setDisplayed(<AboutYou transitionDisplay={transitionDisplay} input={authContext.user || user} />);
                break;
        }
    }

    return displayed || <AboutYou transitionDisplay={transitionDisplay} />;
}

export default Register;