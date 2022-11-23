import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Page } from "../components/ui";
import Divider from "../components/ui/Divider";
import { AuthContext } from "../context/AuthContext";

export default function Protect({ children = <></> }) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return (
            <Page>
                <div className="content-unauthorized">
                    <h1>Hi there! You don't look too familiar.</h1>
                    <p>To view the content on this page, please log in below:</p>
                    <Divider />
                    <Button onClick={() => navigate('/login')}>Log In</Button>
                </div>
            </Page>
        )
    } else {
        return (
            <Page>
                { children }
            </Page>
        )
    }
}