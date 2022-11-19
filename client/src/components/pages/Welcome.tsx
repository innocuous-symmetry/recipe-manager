import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Page, Panel } from "../ui"
import Divider from "../ui/Divider";

const Welcome = () => {
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();

    const authUserActions = (
        <Panel extraStyles="inherit-background c-papyrus uppercase">
            <Button>Browse Recipes</Button>
            <Button>Collections</Button>
            <Button>Grocery List</Button>
        </Panel>
    )

    const callToRegister = (
        <Panel extraStyles="inherit-background c-papyrus uppercase">
            <h2>Ready to get started?</h2>
            <Button onClick={() => navigate('/register')}>Register</Button>
        </Panel>
    )

    return (
        <Page extraStyles="narrow-dividers">
            <Panel extraStyles='inherit-background c-papyrus uppercase'>
                <h1>Welcome to Recipin</h1>
            </Panel>

            <Divider />

            <Panel extraStyles="inherit-background c-papyrus uppercase">
                <h2>Simple Recipe Management and Sharing for the Home</h2>
            </Panel>

            <Divider />

            <Panel extraStyles="inherit-background c-papyrus uppercase">
                <h2>Build Shopping Lists Directly from Your Recipes</h2>
            </Panel>

            <Divider />

            { authorized ? authUserActions : callToRegister }
        </Page>
    )
}

export default Welcome;