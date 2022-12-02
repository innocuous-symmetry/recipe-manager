import { Button, Divider, Page, Panel, TextField, UserCard } from "../../ui";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { RegisterVariantType, VariantLabel } from ".";
import { IUser } from "../../../schemas";
import { getAllUsers } from "../../../util/apiUtils";
import { v4 } from 'uuid';

const AddFriends: RegisterVariantType = ({ transitionDisplay }) => {
    const [searchTerm, setSearchTerm] = useState<string>();
    const [userPool, setUserPool] = useState<IUser[]>([]);
    const [friendResults, setFriendResults] = useState<IUser[]>([]);

    const handleClick = async () => {
        transitionDisplay(VariantLabel.FinishUp);
    }

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
            const result = await getAllUsers();
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
        <Page>
            <h1>Cool, we'll keep all the recipes you post in that collection.</h1>
            <Divider />

            <p>You can access that any time by clicking on "Collections" in your menu bar.</p>
            <p>One last thing, and you'll be good to go!</p>

            <Panel>
                <h2>If any of your friends already use Recipin, you can use the widget below to find them and add them!</h2>
                <p>This will allow you to share recipes and collections back and forth, and leave comments on each other's recipes.</p>

                <h3>If you know their email or unique handle, type it in below!</h3>

                <div id="friend-search-widget">
                    <TextField onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value.toLowerCase())} placeholder={'Search'} />

                    {
                        friendResults && friendResults.map((friend: IUser) => {
                            return <UserCard key={v4()} user={friend} canAdd liftData={() => handleRequestSent(friend.id!)} />
                        })
                    }
                </div>
            </Panel>

            <Button onClick={handleClick}>Finish</Button>
        </Page>
    )
}

export default AddFriends;