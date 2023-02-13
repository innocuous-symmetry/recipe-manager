import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import { getAllUsers, getFriendships, getPendingFriendRequests, getUserByID } from "../../util/apiUtils";
import API from "../../util/API";
import UserCard from "../ui/UserCard";
import { IUser, IFriendship } from "../../schemas";
import { Card, Divider, Panel } from "../ui";
import FriendSearchWidget from "../ui/Widgets/FriendSearchWidget";

export default function Friends() {
    const [friends, setFriends] = useState<IFriendship[]>();
    const [userList, setUserList] = useState(new Array<IUser>());
    const { user, token } = useAuthContext();

    useEffect(() => {
        if (!user || !token) return;
        (async function() {
            try {
                const Friends = new API.Friendship(token);
                const result = await Friends.getAll();
    
                if (result.length) {
                    setFriends(result);
                }

                console.log(result);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [])

    useEffect(() => {
        if (!token || !friends) return;
        
        friends.map(async (friend: IFriendship) => {
            const Friends = new API.Friendship(token);
            const userData = await Friends.getByID(friend.targetid as string);
            if (userData) setUserList((prev: IUser[]) => {
                return [...prev, userData]
            })
        })
    }, [friends]);

    useEffect(() => {
        console.log(userList);
    }, [setUserList])

    return (
        <>
        { userList.length ? 
        (
            <Card extraStyles="flex-row">
                <h2>Your friendships:</h2>
                {
                    userList.map((user: IUser) => {
                        return <UserCard key={v4()} user={user} />
                    })
                }
            </Card>
        ) : 
        (
            <Card>
                <p>You don't have any friends!</p>
                <Divider />
                <p>We can fix that, if you'd like.</p>
                <p>Use the widget below to search our users:</p>

                <FriendSearchWidget />
            </Card>
        )
        }
        </>
    )
}