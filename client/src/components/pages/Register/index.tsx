import { useState } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Page } from "../../ui";
import AboutYou from "./register.aboutyou";

export default function Register() {
    const [displayed, setDisplayed] = useState<JSX.Element>(<AboutYou />);
    const authContext = useAuthContext();

    return displayed;
}