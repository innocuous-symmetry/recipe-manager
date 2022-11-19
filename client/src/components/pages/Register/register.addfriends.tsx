import { Page } from "../../ui";

export default function AddFriends() {
    let user = null;

    return (
        <Page>
            <h1>Hi, {user || "Mikayla"}! Great to meet you.</h1>
        </Page>
    )
}