import Protect from "../../util/Protect"
import { Divider, Panel } from "../ui"
import FriendSearchWidget from "../ui/Widgets/NewFriendWidget"

const AddFriends = () => {
    return (
        <Protect redirect="/add-friends">
            <h1>Search for New Friends</h1>

            <Divider />

            <Panel>
                <h2>Use the widget below to search for new friends!</h2>
                <Divider />
                
                <FriendSearchWidget />
            </Panel>
        </Protect>
    )
}

export default AddFriends