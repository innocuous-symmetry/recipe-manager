import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import API from "../../util/API";
// import { addFriend, getPendingFriendRequests } from "../../util/apiUtils";
import { UserCardType } from "../../util/types";
import Button from "./Button";
import Card from "./Card";

const UserCard: UserCardType = ({ extraStyles, user }) => {
    const { token } = useAuthContext();

    useEffect(() => {
        if (!token) return;

        (async function() {
            const friends = new API.Friendship(token);
            const requestsOpen = await friends.getPendingFriendRequests();
            console.log(requestsOpen);
            if (!requestsOpen) return;

            for (let req of requestsOpen) {
                if (req.targetid == user.id) {
                    console.log('should disable');
                    return;
                }
            }

            console.log('should not disable');
        });
    }, [])

    const handleClick = async () => {
        if (!token) return;
        const friends = new API.Friendship(token);
        const request = await friends.addFriend(user.id!.toString());
        if (request) console.log("Friend request sent to " + user.firstname);
    }

    return (
        <Card extraStyles={'user-card' + extraStyles}>
            <div className="avatar"></div>
            <h3>{user.firstname} {user.lastname.substring(0,1)}.</h3>
            <h4>@{user.handle}</h4>
            <Button disabledText={"Request Sent"} onClick={handleClick}>Add Me</Button>
        </Card>
    )
}

export default UserCard;