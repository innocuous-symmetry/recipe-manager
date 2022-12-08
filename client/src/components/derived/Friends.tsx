import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import { getAllUsers, getFriendships, getPendingFriendRequests, getUserByID } from "../../util/apiUtils";
import UserCard from "../ui/UserCard";
import { IUser, IFriendship } from "../../schemas";
import { Card, Divider, Panel } from "../ui";
import FriendSearchWidget from "../ui/Widgets/FriendSearchWidget";

export default function Friends() {
    const [friends, setFriends] = useState<IFriendship[]>();
    const [userList, setUserList] = useState(new Array<IUser>());
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) return;
        (async function() {
            try {
                const rawResult = await getFriendships();
    
                if (rawResult.length) {
                    const result = rawResult.filter((item: IFriendship) => (item.senderid == user.id) && !(item.pending));
                    setFriends(result);
                }
            } catch(e) {
                console.error(e);
            }
        })()
    }, [user])

    useEffect(() => {
        friends && friends.map(async (friend: IFriendship) => {
            const userData = await getUserByID(friend.targetid);
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
            <Panel extraStyles="flex-row">
                <h2>Your friendships:</h2>
                {
                    userList.map((user: IUser) => {
                        return <UserCard key={v4()} user={user} />
                    })
                }
            </Panel>
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