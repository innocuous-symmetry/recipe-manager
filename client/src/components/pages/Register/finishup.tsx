import { useNavigate } from "react-router-dom";
import { RegisterVariantType } from ".";
import { Button, Divider, Page, Panel } from "../../ui";

const FinishUp: RegisterVariantType = () => {
    const navigate = useNavigate();

    return (
        <Page>
            <h1>Awesome, you're good to go!</h1>
            <Divider />
            <h2>If you aren't sure where to start, here are some great things to try out first:</h2>

            <Panel>
                <ul>
                    <li><a>Enter some recipes!</a></li>
                    <li>Set up additional collections for your most frequented recipes</li>
                    <li>Tell your friends so you can share your favorites back and forth!</li>
                    <li>Use your collections to automatically generate grocery lists</li>
                    <li>Or, if you're a developer, <a>contribute to our source code!</a></li>
                </ul>
            </Panel>

            <Button onClick={() => navigate('/')}>Get Started!</Button>
        </Page>
    )
}

export default FinishUp