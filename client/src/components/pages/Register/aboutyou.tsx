import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { RegisterVariantType, VariantLabel } from ".";
import { useAuthContext } from "../../../context/AuthContext";
import { IUser, IUserAuth } from "../../../schemas";
import { attemptLogin, attemptRegister } from "../../../util/apiUtils";
import { Button, Page, Panel } from "../../ui";
import Divider from "../../ui/Divider";
import Form, { FormConfig } from "../../ui/Form";

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
    const navigate = useNavigate();
    const authContext = useAuthContext();
    const [form, setForm] = useState<JSX.Element>(<p key={v4()}>Loading content...</p>);
    const [input, setInput] = useState<IUser>(blankUser);
    const [regSuccess, setRegSuccess] = useState<any>();

    const getFormState = useCallback((received: IUser) => {
        setInput(received);
    }, []);

    useEffect(() => {
        if (authContext.user) navigate('/');
    }, [authContext]);

    async function handleRegister() {
        const res = await attemptRegister(input);
        if (res.ok) {
            transitionDisplay(VariantLabel.InitialCollection, input);
        }
    }

    async function unwrapLogin() {
        const data: IUserAuth = { email: input.email, password: input.password || "" }
        const login = await attemptLogin(data);
        if (login) {
            authContext.user = login.user;
        }
        navigate('/');
    }

    useEffect(() => {
        setForm(new Form<IUser>({
            parent: "register",
            keys: ['firstname', 'lastname', 'handle', 'email', 'password'],
            initialState: input,
            labels: ['First Name', 'Last Name', 'Handle', 'Email', "Password"],
            dataTypes: ['text', 'text', 'text', 'email', 'password'],
            getState: getFormState
        }).mount());
    }, [])

    useEffect(() => {
        if (regSuccess) unwrapLogin();
    }, [regSuccess])

    return (
        <Page>
            <h1>Hi! Thanks for being here.</h1>

            <Divider />
            
            <h2>Tell us a bit about yourself:</h2>

            <Panel extraStyles="form-panel two-columns">
                { form || <h2>Loading...</h2> }
                <Button onClick={handleRegister}>Register</Button>
            </Panel>
        </Page>
    )
}

export default AboutYou;