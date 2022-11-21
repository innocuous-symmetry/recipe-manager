import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import { IUser } from "../../../schemas";
import { attemptRegister } from "../../../util/apiUtils";
import { Button, Page, Panel } from "../../ui";
import Divider from "../../ui/Divider";
import Form, { FormConfig } from "../../ui/Form";

export default function AboutYou() {
    const [form, setForm] = useState<JSX.Element[]>([<p key={v4()}>Loading content...</p>]);
    const [input, setInput] = useState<IUser>({
        firstname: '',
        lastname: '',
        handle: '',
        email: '',
        password: '',
        active: true
    });

    const getFormState = useCallback((received: IUser) => {
        setInput(received);
    }, []);

    const formConfig: FormConfig<IUser> = {
        parent: "register",
        keys: ['firstname', 'lastname', 'handle', 'email', 'password'],
        initialState: input,
        labels: ['First Name', 'Last Name', 'Handle', 'Email', "Password"],
        dataTypes: ['text', 'text', 'text', 'email', 'password'],
        getState: getFormState
    }

    useEffect(() => {
        setForm(new Form<IUser>(formConfig).mount());
    }, [])

    const handleRegister = async () => {
        for (let key of Object.keys(input)) {
            if (!input[key as keyof IUser]) return;
        }

        console.log(input);

        const result = await attemptRegister(input);
        console.log(result);
    }

    return (
        <Page>
            <h1>Hi! Thanks for being here.</h1>

            <Divider />
            
            <h2>Tell us a bit about yourself:</h2>

            <Panel extraStyles="form-panel two-columns">
                { form }
                <Button onClick={handleRegister}>Register</Button>
            </Panel>
        </Page>
    )
}