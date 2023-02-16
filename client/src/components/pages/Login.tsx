import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext, useAuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { IUser, IUserAuth } from "../../schemas";
import { Button, Form, Page, Panel } from "../ui";
import { FormConfig } from "../ui/Form/Form";
import API from "../../util/API";

export default function Login() {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    const { user, setToken } = useContext(AuthContext);

    // setup and local state
    const navigate = useNavigate();
    const [input, setInput] = useState<IUserAuth>({ email: '', password: '' });

    // retrieve and store state from form
    const getFormState = useCallback((received: IUserAuth) => {
        setInput(received);
    }, [input])


    const handleLogin = async () => {
        if (!input.email || !input.password) return;
        const result = await new API.Auth().login(input);

        // setting token will trigger ui update
        setToken(result.token);

        // if there is a redirect, go there, else go home
        navigate(`/${redirect ?? ''}`);
    }

    // check for logged in user and mount form
    useEffect(() => {
        if (user) navigate('/');
    }, [])

    return (
        <Page>
            <h1>Hello! Nice to see you again.</h1>

            <Panel extraClasses="form-panel">

                <Form<IUserAuth> _config={{
                    parent: 'login',
                    keys: Object.keys(input),
                    labels: ["Email", "Password"],
                    dataTypes: Object.keys(input),
                    initialState: input,
                    getState: getFormState
                }} />

                <Button onClick={handleLogin}>Log In</Button>

            </Panel>

            <aside>Not registered yet? You can do that <a href="/register">here.</a></aside>
        </Page>
    )
}