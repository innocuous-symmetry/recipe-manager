import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedIn, NotLoggedIn, Registering } from "./variants";
import { useAuthContext } from "../../../context/AuthContext";
import { IUser } from "../../../schemas";
import "/src/sass/components/Navbar.scss";

const Navbar: FC<{receiveChange: (change: IUser) => void}> = ({ receiveChange }) => {
    // setup and local state
    const navigate = useNavigate();
    const { user, setUser } = useAuthContext();
    const [received, setReceived] = useState<IUser | undefined>();
    const [displayed, setDisplayed] = useState<JSX.Element>();

    // lift and store state from navbar variants
    const liftChange = useCallback((newValue: IUser | undefined) => {
        if (!newValue) {
            return;
        }
        
        setUser(newValue);
        setReceived(newValue);
    }, [])

    const variants = {
        loggedin:    <LoggedIn navigate={navigate} received={received} liftChange={liftChange} />,
        notloggedin: <NotLoggedIn navigate={navigate} received={received} />,
        registering: <Registering navigate={navigate} received={received} />
    }

    // side effects for live rendering
    useEffect(() => {
        user && setReceived(user);
    }, [user])

    useEffect(() => {
        if (received) receiveChange(received);
        setDisplayed(received ? variants.loggedin : variants.notloggedin);
    }, [received, setReceived]);

    return displayed || <p>Loading...</p>;
}

export default Navbar;