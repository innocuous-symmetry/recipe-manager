import { useNavigate } from "react-router-dom";
import { Button, Divider, Page } from "../../ui";

export default function ResourceNotFound({ children = <></> }) {
    const navigate = useNavigate();

    return (
        <Page>
            <h1>404: We didn't find what you are looking for</h1>
            { children }

            <Divider />
            <Button onClick={() => navigate('/')}>Home</Button>
        </Page>
    )
}