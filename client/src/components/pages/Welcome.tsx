import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { attemptLogout, checkCredientials } from "../../util/apiUtils";
import { Button, Page, Panel } from "../ui"
import Divider from "../ui/Divider";

const Welcome = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuthContext();

    const authUserActions = (
        <Panel extraStyles="inherit-background c-papyrus uppercase flexrow">
            <Button onClick={() => navigate('/explore')}>Browse Recipes</Button>
            <Button onClick={() => navigate('/subscriptions')}>Subscriptions</Button>
            <Button onClick={() => navigate('/grocery-list')}>Grocery Lists</Button>
        </Panel>
    )

    const callToRegister = (
        <Panel extraStyles="inherit-background c-papyrus uppercase">
            <h2>Ready to get started?</h2>
            <Button onClick={() => navigate('/register')}>Register</Button>
            <Button onClick={attemptLogout}>Log Out</Button>
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
                <button onClick={checkCredientials}></button>
            </Panel>

            <Divider />

            { user ? authUserActions : callToRegister }
        </Page>
    )
}

export default Welcome;