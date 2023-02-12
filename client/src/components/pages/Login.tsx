import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext, useAuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { IUser, IUserAuth } from "../../schemas";
import { Button, Form, Page, Panel } from "../ui";
import { FormConfig } from "../ui/Form";
import API from "../../util/API";

export default function Login() {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    const { user, setUser } = useContext(AuthContext);
    const [form, setForm] = useState<JSX.Element>();

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
        console.log(result);

        // const { data, ok } = await attemptLogin(input);
        // if (ok) setUser(data);
        // navigate(`/${redirect ?? ''}`);
    }

    // check for logged in user and mount form
    useEffect(() => {
        if (user) navigate('/');
    }, [])

    useEffect(() => {
        console.log(input);
    }, [getFormState])

    return (
        <Page>
            <h1>Hello! Nice to see you again.</h1>

            <Panel extraStyles="form-panel">

                <Form parent={input} _config={{
                    parent: 'login',
                    keys: Object.keys(input),
                    labels: ["Email", "Password"],
                    dataTypes: Object.keys(input),
                    initialState: input,
                    getState: getFormState
                } as FormConfig<typeof input>} />

                <Button onClick={handleLogin}>Log In</Button>

            </Panel>

            <aside>Not registered yet? You can do that <a href="/register">here.</a></aside>
        </Page>
    )
}