import { useEffect, useState } from "react";
import { addFriend, getPendingFriendRequests } from "../../util/apiUtils";
import { UserCardType } from "../../util/types";
import Button from "./Button";
import Card from "./Card";

const UserCard: UserCardType = ({ extraStyles, user, canAdd = false, liftData }) => {
    const [shouldDisable, setShouldDisable] = useState<boolean>(canAdd);
    
    useEffect(() => {
        (async function() {
            const requestsOpen = await getPendingFriendRequests();
            if (!requestsOpen) return;

            for (let req of requestsOpen) {
                if (req.targetid == user.id) {
                    setShouldDisable(true);
                    return;
                }
            }

            setShouldDisable(false);
        })();
    }, [])

    const handleClick = async () => {
        const { id } = user;
        const request = await addFriend(id!.toString());
        if (request) console.log("Friend request sent to " + user.firstname);
    }

    return (
        <Card extraStyles={'user-card' + extraStyles}>
            <div className="avatar"></div>
            <h3>{user.firstname} {user.lastname.substring(0,1)}.</h3>
            <h4>@{user.handle}</h4>
            { canAdd && <Button disabledText={"Request Sent"} disabled={shouldDisable} onClick={handleClick}>Add Me</Button> }
        </Card>
    )
}

export default UserCard;