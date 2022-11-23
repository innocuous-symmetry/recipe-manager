import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import { getFriendships } from "../../util/apiUtils";
import UserCard from "../ui/UserCard";
import { IUser } from "../../schemas";
import { Panel } from "../ui";

export default function Friends() {
    const [friends, setFriends] = useState<IUser[]>();
    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) return;
        const { id } = user;

        const wrapper = async () => {
            // HARD CODED
            const result = await getFriendships(1);
            setFriends(result);
        }

        wrapper();
    }, [user])

    return (
        <Panel extraStyles="flex-row">
            <h2>Your friendships:</h2>
            { friends && friends.map((user: IUser) => {
                return <UserCard key={v4()} user={user} />
            })}
        </Panel>
    )
}