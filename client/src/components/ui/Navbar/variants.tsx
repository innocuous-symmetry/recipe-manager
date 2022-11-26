import { attemptLogout } from "../../../util/apiUtils";
import { NavbarType } from "../../../util/types";
import Button from "../Button";

const LoggedIn: NavbarType = ({ received, liftChange, navigate }) => {
    const handleLogout = async () => {
        const success = await attemptLogout();
        if (success) liftChange!(undefined);
        navigate('/');
    }

    return (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className="navbar-block">
                <p>Hi, {received?.firstname}.</p>
                <span id="search-icon"></span>
                <Button onClick={() => navigate('/profile')}>Profile</Button>
                <Button onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    )
}

const NotLoggedIn: NavbarType = ({ navigate }) => {
    return (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className='navbar-block'>
                <button onClick={() => navigate('/login')}>LOG IN</button>
            </div>
        </div>
    )
}

const Registering: NavbarType = ({ received, navigate }) => {
    return (
        <div id="navbar">
            <div className="navbar-block">
                <a onClick={() => navigate('/')}>RECIPIN</a>
            </div>
            <div className="navbar-block">
                <p>Hi, {received?.firstname}.</p>
            </div>
        </div>
    )
}

export { LoggedIn, NotLoggedIn, Registering }