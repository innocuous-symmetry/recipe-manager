import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { attemptLogin } from "../../util/apiUtils";
import { IUserAuth } from "../../schemas";
import { Button, Form, Page, Panel } from "../ui";

export default function Login() {
    // setup and local state
    const authContext = useAuthContext();
    const navigate = useNavigate();
    const [form, setForm] = useState<JSX.Element>();
    const [input, setInput] = useState<IUserAuth>({ email: '', password: '' });

    // retrieve and store state from form
    const getFormState = useCallback((received: IUserAuth) => {
        setInput(received);
    }, [])


    const handleLogin = async () => {
        if (!input.email || !input.password) return;
        const result = await attemptLogin(input);
        authContext.user = result.user;
        navigate('/');
    }

    // check for logged in user and mount form
    useEffect(() => {
        if (authContext.user) navigate('/');
        setForm(
            new Form<IUserAuth>({
                parent: 'login',
                keys: Object.keys(input),
                labels: ["Email", "Password"],
                dataTypes: Object.keys(input),
                initialState: input,
                getState: getFormState
            }).mount()
        );
    }, [])

    return (
        <Page>
            <h1>Hello! Nice to see you again.</h1>

            <Panel extraStyles="form-panel">
                { form || <h2>Loading...</h2> }
                <Button onClick={handleLogin}>Log In</Button>
            </Panel>

            <aside>Not registered yet? You can do that <a href="/register">here.</a></aside>
        </Page>
    )
}