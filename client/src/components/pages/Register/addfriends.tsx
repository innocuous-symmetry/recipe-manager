import { ChangeEvent, useEffect, useState } from "react";
import { RegisterVariantType, VariantLabel } from ".";
import { IUser } from "../../../schemas";
import { Button, Divider, Page, Panel, TextField, UserCard } from "../../ui";

const AddFriends: RegisterVariantType = ({ transitionDisplay }) => {
    const [searchTerm, setSearchTerm] = useState<string>();
    const [friendResults, setFriendResults] = useState<IUser[]>();

    const handleClick = async () => {
        transitionDisplay(VariantLabel.FinishUp);
    }

    useEffect(() => {
        // run search when state changes and store it in friendresults
        console.log(searchTerm);
    }, [searchTerm])

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
                    <TextField onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)} placeholder={'Search'} />

                    {
                        friendResults && friendResults.map((friend: IUser) => {
                            return <UserCard user={friend} />
                        })
                    }
                </div>
            </Panel>

            <Button onClick={handleClick}>Finish</Button>
        </Page>
    )
}

export default AddFriends;