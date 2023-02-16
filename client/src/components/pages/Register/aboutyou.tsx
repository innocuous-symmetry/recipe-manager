import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterVariantType, VariantLabel } from ".";
import { useAuthContext } from "../../../context/AuthContext";
import { IUser } from "../../../schemas";
import API from "../../../util/API";
import { Button, Page, Panel } from "../../ui";
import Divider from "../../ui/Divider";
import Form from "../../ui/Form/Form";

const blankUser: IUser = {
    firstname: '',
    lastname: '',
    handle: '',
    email: '',
    password: '',
    active: true,
    isadmin: false
}

const AboutYou: RegisterVariantType = ({ transitionDisplay }) => {
    const auth = new API.Auth();
    const navigate = useNavigate();
    const { user, setToken } = useAuthContext();
    const [input, setInput] = useState<IUser>(blankUser);

    const getFormState = useCallback((received: IUser) => {
        setInput(received);
    }, []);

    useEffect(() => {
        if (user) navigate('/');
    }, [user]);

    async function handleRegister() {
        const res = await auth.register(input);
        if (res.ok) {
            setTimeout(async () => {
                const result = await auth.login(input);
                setToken(result.token);
            }, 750);

            transitionDisplay(VariantLabel.InitialCollection, input);
        }
    }

    return (
        <Page>
            <h1>Hi! Thanks for being here.</h1>

            <Divider />
            
            <h2>Tell us a bit about yourself:</h2>

            <Panel extraClasses="form-panel two-columns">

                <Form<IUser> _config={{
                    parent: "register",
                    keys: ['firstname', 'lastname', 'handle', 'email', 'password'],
                    initialState: input,
                    labels: ['First Name', 'Last Name', 'Handle', 'Email', "Password"],
                    dataTypes: ['text', 'text', 'text', 'email', 'password'],
                    getState: getFormState
                }} />

                <Button onClick={handleRegister}>Register</Button>
            </Panel>
        </Page>
    )
}

export default AboutYou;