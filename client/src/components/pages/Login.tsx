import { useState } from "react";
import { IUserAuth } from "../../schemas";
import { Button, Page, Panel } from "../ui";

export default function Login() {
    const [input, setInput] = useState<IUserAuth>({
        email: '',
        password: ''
    })

    const handleLogin = async () => {
        if (!input.email || !input.password) return;
    }

    return (
        <Page>
            <h1>Hello! Nice to see you again.</h1>

            <Panel extraStyles="form-panel">
                <label htmlFor="login-email">Email</label>
                <input type="text" id="login-email" onChange={(e) => setInput({...input, email: e.target.value})}></input>
                <label htmlFor="login-password">Password</label>
                <input type="text" id="login-password" onChange={(e) => setInput({...input, password: e.target.value})}></input>
                <Button onClick={() => {}}>Log In</Button>
            </Panel>

            <aside>Not registered yet? You can do that <a href="/register">here.</a></aside>
        </Page>
    )
}