import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import { getAllUsers, getFriendships, getPendingFriendRequests, getUserByID } from "../../util/apiUtils";
import API from "../../util/API";
import UserCard from "../ui/UserCard";
import { IUser, IFriendship } from "../../schemas";
import { Card, Divider, Panel } from "../ui";
import FriendSearchWidget from "../ui/Widgets/FriendSearchWidget";

const Friends: FC<{ targetUser?: IUser }> = ({ targetUser }) => {
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
            const User = new API.User(token);
            const userData = await User.getByID(friend.targetid as string);
            if (userData) setUserList((prev: IUser[]) => {
                if (prev.includes(userData)) {
                    return prev;
                } else {
                    return [...prev, userData]
                }
            })
        })
    }, [friends]);

    return (
        <>
        { userList.length ? 
        (
            <Card extraClasses="flex-row">
                <h2>Friends ({ userList?.length ?? "0" }):</h2>

                <div className="friends-list">
                {
                    userList.map((user: IUser) => {
                        return <UserCard key={v4()} targetUser={user} />
                    })
                }
                </div>

                <aside>
                    <p>Looking for someone else?</p>
                    <p>You can search for more friends <a href="/add-friends">here!</a></p>
                </aside>
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

export default Friends