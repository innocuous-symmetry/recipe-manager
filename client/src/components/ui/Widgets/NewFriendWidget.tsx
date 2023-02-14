import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { IUser } from "../../../schemas";
import { TextField, UserCard } from "..";
import { v4 } from "uuid";
import API from "../../../util/API";
import { useAuthContext } from "../../../context/AuthContext";

const FriendSearchWidget: FC<{}> = () => {
    const { token } = useAuthContext();

    const [searchTerm, setSearchTerm] = useState<string>();
    const [userPool, setUserPool] = useState<IUser[]>([]);
    const [pendingRequests, setPendingRequests] = useState();
    const [friendResults, setFriendResults] = useState<IUser[]>([]);

    // load available user pool on mount
    useEffect(() => {
        if (!token) return;
        (async function() {
            const users = new API.User(token);
            const result = await users.getAll();
            if (result) setUserPool(result);
        })();

        (async function() {
            const friends = new API.Friendship(token);
            const result = await friends.getAll();
            setFriendResults(result);
        })();
    }, [])

    useEffect(() => {
        console.log(searchTerm);
        searchTerm && setUserPool((prev) => {
            const newPool = prev.filter(person => {
                if (person.firstname.toLowerCase().includes(searchTerm) || person.lastname.toLowerCase().includes(searchTerm) || person.handle.toLowerCase().includes(searchTerm)) return person;
            })

            return newPool;
        })
    }, [searchTerm])

    useEffect(() => {
        console.log(userPool);
    }, [userPool])

    return (
        <div id="friend-search-widget">
            <TextField onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value.toLowerCase())} placeholder={'Search'} />

            {
                userPool.map((friend: IUser) => {
                    return <UserCard key={v4()} user={friend} canAdd liftData={() => {}} />
                })
            }
        </div>
    )
}

export default FriendSearchWidget;