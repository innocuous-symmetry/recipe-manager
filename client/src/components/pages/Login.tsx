import { useCallback, useEffect, useState } from "react";
import { IUserAuth } from "../../schemas";
import { attemptLogin } from "../../util/apiUtils";
import { Button, Page, Panel } from "../ui";
import Form, { FormConfig } from "../ui/Form";

export default function Login() {
    const [form, setForm] = useState<JSX.Element[]>();
    const [input, setInput] = useState<IUserAuth>({
        email: '',
        password: ''
    })

    const getFormState = useCallback((received: IUserAuth) => {
        setInput(received);
    }, [])

    const handleLogin = async () => {
        if (!input.email || !input.password) return;
        const result = await attemptLogin(input);
        console.log(result);
    }

    const formConfig: FormConfig<IUserAuth> = {
        parent: 'login',
        keys: Object.keys(input),
        labels: ["Email", "Password"],
        dataTypes: Object.keys(input),
        initialState: input,
        getState: getFormState
    }

    useEffect(() => {
        setForm(new Form<IUserAuth>(formConfig).mount())
    }, [])

    return (
        <Page>
            <h1>Hello! Nice to see you again.</h1>

            <Panel extraStyles="form-panel">
                { form }
                <Button onClick={handleLogin}>Log In</Button>
            </Panel>

            <aside>Not registered yet? You can do that <a href="/register">here.</a></aside>
        </Page>
    )
}