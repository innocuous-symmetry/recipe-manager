import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import { getAllUsers, getFriendships, getPendingFriendRequests, getUserByID } from "../../util/apiUtils";
import UserCard from "../ui/UserCard";
import { IUser, IFriendship } from "../../schemas";
import { Panel } from "../ui";

export default function Friends() {
    const [friends, setFriends] = useState<IFriendship[]>();
    const [userList, setUserList] = useState(new Array<IUser>());
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) return;
        (async function() {
            const rawResult = await getFriendships();
            console.log(rawResult);

            const result = rawResult.filter((item: IFriendship) => (item.senderid == user.id) && !(item.pending));
            console.log(result);

            setFriends(result);
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
        <Panel extraStyles="flex-row">
            <h2>Your friendships:</h2>
            {
                userList.map((user: IUser) => {
                    return <UserCard key={v4()} user={user} />
                })
            }
        </Panel>
    )
}