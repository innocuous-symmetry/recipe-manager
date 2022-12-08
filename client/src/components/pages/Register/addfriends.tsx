import { Button, Divider, Page, Panel } from "../../ui";
import { RegisterVariantType, VariantLabel } from ".";
import FriendSearchWidget from "../../ui/Widgets/FriendSearchWidget";

const AddFriends: RegisterVariantType = ({ transitionDisplay }) => {
    const handleTransition = async () => {
        transitionDisplay(VariantLabel.FinishUp);
    }

    return (
        <Page>
            <h1>Cool, we'll keep all the recipes you post in that collection.</h1>
            <Divider />

            <p>You can access that any time by clicking on "Collections" in your menu bar.</p>
            <p>One last thing, and you'll be good to go!</p>

            <Panel>
                <h2>If any of your friends already use Recipin, you can use the widget below to find them and add them!</h2>
                <p>This will allow you to share recipes and collections back and forth, and leave comments on each other's recipes.</p>

                <h3>If you know their email or unique handle, type it in below!</h3>
                <FriendSearchWidget />
            </Panel>

            <Button onClick={handleTransition}>Finish</Button>
        </Page>
    )
}

export default AddFriends;