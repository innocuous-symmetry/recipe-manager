import { useEffect, useState } from "react";
import { LoggedIn, NotLoggedIn, Registering } from "./variants";
import { useAuthContext } from "../../../context/AuthContext";
import "/src/sass/components/Navbar.scss";

const Navbar = () => {
    // setup and local state
    const { user } = useAuthContext();
    const [displayed, setDisplayed] = useState<JSX.Element>(<p>Loading...</p>);

    const variants = {
        loggedin:    <LoggedIn />,
        notloggedin: <NotLoggedIn />,
        registering: <Registering />
    }

    // side effects for live rendering
    useEffect(() => {
        setDisplayed(user ? variants.loggedin : variants.notloggedin);
    }, [user]);

    return displayed;
}

export default Navbar;