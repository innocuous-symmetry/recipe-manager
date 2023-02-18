import { useNavigate } from "react-router-dom";
import { Button, Divider, Page } from "../../ui";

export default function AccessForbidden({ children = <></> }) {
    const navigate = useNavigate();

    return (
        <Page>
            <h1>403: Unauthorized</h1>
            { children }

            <Divider />
            <Button onClick={() => navigate('/')}>Home</Button>
        </Page>
    )
}