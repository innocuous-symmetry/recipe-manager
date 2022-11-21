import { useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import { IUser } from "../../../schemas";
import { attemptRegister } from "../../../util/apiUtils";
import { Page, Panel } from "../../ui";
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

    const formConfig: FormConfig<IUser> = {
        parent: "register",
        keys: Object.keys(input),
        initialState: input,
        labels: ['First Name', 'Last Name', 'Handle', 'Email', "Password", "Active?"],
        dataTypes: ['text', 'text', 'text', 'email', 'password', 'text'],
        setState: setInput,
        submitButtonText: 'Register',
        submitFunction: () => console.log(input)
    }

    useEffect(() => {
        setForm(new Form<IUser>(formConfig).mount());
    }, [])

    return (
        <Page>
            <h1>Hi! Thanks for being here.</h1>

            <Divider />
            
            <h2>Tell us a bit about yourself:</h2>

            <Panel extraStyles="form-panel two-columns">
                { form }
            </Panel>
        </Page>
    )
}