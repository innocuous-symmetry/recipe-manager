import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { IUser } from "../../../schemas";
import { TextField, UserCard } from "..";
import { v4 } from "uuid";
import { getAllUsers } from "../../../util/apiUtils";
import API from "../../../util/API";
import { useAuthContext } from "../../../context/AuthContext";

const FriendSearchWidget: FC<{}> = () => {
    const { token } = useAuthContext();

    const [searchTerm, setSearchTerm] = useState<string>();
    const [userPool, setUserPool] = useState<IUser[]>([]);
    const [friendResults, setFriendResults] = useState<IUser[]>([]);

    // this isn't really working right now i don't think
    const handleRequestSent = useCallback((targetid: string | number) => {
        setUserPool((prev: IUser[]) => {
            const newResults = prev.filter((user: IUser) => {
                return user.id !== targetid;
            })

            return newResults;
        })
    }, [])

    // load available user pool on mount
    useEffect(() => {
        (async function() {
            if (!token) return;
            const users = new API.User(token);

            const result = await users.getAll();
            if (result) setUserPool(result);
        })();
    }, [])

    useEffect(() => {
        if (!searchTerm) {
            setFriendResults(new Array<IUser>());
        } else {
            const narrowedPool = userPool?.filter((person: IUser) => {
                if (person.firstname.toLowerCase().includes(searchTerm) || person.lastname.toLowerCase().includes(searchTerm) || person.handle.toLowerCase().includes(searchTerm)) return person;
            })

            setFriendResults(narrowedPool);
        }
    }, [userPool, searchTerm])

    return (
        <div id="friend-search-widget">
            <TextField onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value.toLowerCase())} placeholder={'Search'} />

            {
                friendResults && friendResults.map((friend: IUser) => {
                    return <UserCard key={v4()} user={friend} canAdd liftData={() => handleRequestSent(friend.id!)} />
                })
            }
        </div>
    )
}

export default FriendSearchWidget;