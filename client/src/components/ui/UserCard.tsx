import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { UserCardType } from "../../util/types";
import API from "../../util/API";
import Button from "./Button";
import Card from "./Card";

const UserCard: UserCardType = ({ extraStyles, targetUser }) => {
    const [buttonVariant, setButtonVariant] = useState(<></>);
    const { token } = useAuthContext();

    useEffect(() => {
        if (!token) return;

        (async function() {
            try {
                const friends = new API.Friendship(token);
                const requestsOpen = await friends.getPendingFriendRequests();
                if (!requestsOpen) return;
    
                for (let req of requestsOpen) {
                    if (req.targetid == targetUser.id) {
                        setButtonVariant(<Button disabled>Request Sent!</Button>)
                        return;
                    }
                }
    
                setButtonVariant(<Button onClick={handleClick}>Send Request</Button>)
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.statusText);
                }
            }
        })();
    }, [])

    const handleClick = async () => {
        if (!token) return;
        const friends = new API.Friendship(token);
        const request = await friends.addFriend(targetUser.id!.toString());
        if (request) {
            setButtonVariant(<Button disabled>Request Sent!</Button>)
        }
    }

    return (
        <Card extraStyles={'user-card' + extraStyles}>
            <div className="avatar"></div>
            <h3><a href={`/profile?id=${targetUser.id}`}>{targetUser.firstname} {targetUser.lastname.substring(0,1)}.</a></h3>
            <h4>@{targetUser.handle}</h4>
            { buttonVariant }
        </Card>
    )
}

export default UserCard;