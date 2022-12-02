import { ChangeEvent, useEffect, useState } from "react";
import { RegisterVariantType, VariantLabel } from ".";
import { useNow } from "../../../hooks/useNow";
import { ICollection, IUser, IUserAuth } from "../../../schemas";
import { attemptLogin, createNewCollection } from "../../../util/apiUtils";
import { Button, Divider, Page, Panel } from "../../ui";
import TextField from "../../ui/TextField";

const InitialCollection: RegisterVariantType = ({ transitionDisplay, receiveChange, input }) => {
    const [collectionName, setCollectionName] = useState<string>();
    const [view, setView] = useState<JSX.Element>(<Page><h1>Loading...</h1></Page>);
    const [user, setUser] = useState<IUser>();
    const now = useNow();

    async function unwrapLogin(data: IUser) {
        const userInfo: IUserAuth = { email: data.email, password: data.password! }
        const login = await attemptLogin(userInfo);
        setUser(login.user);
    }

    const handleClick = async () => {
        if (!user) return;
        const collection: ICollection = {
            name: collectionName || (user.firstname + "'s Collection"),
            active: true,
            ismaincollection: true,
            ownerid: user.id!.toString(),
            datecreated: now,
            datemodified: now
        }

        const result = await createNewCollection(collection);
        console.log(result);
        if (result) transitionDisplay(VariantLabel.AddFriends);
    }

    useEffect(() => {
        if (input) {
            setTimeout(() => {
                unwrapLogin(input);
            }, 2000);
        }
    }, [])

    useEffect(() => {
        if (user && receiveChange) {
            receiveChange(user);
            setView(
                <Page>
                    <h1>Hi, {user.firstname}! Great to meet you.</h1>
                    <Divider />
                    <h2>Before we finish up here, just a couple more things.</h2>

                    <Panel>
                        <h3>First, let's get your very first recipe collection set up!</h3>
                        <p>This is where you'll store your own recipes as well as information about all of them, such as their cuisine, prep time, and ingredients used.</p>
                        <Divider />
                        <h3>What would you like to call your main collection?</h3>

                        <TextField onChange={(e: ChangeEvent<HTMLInputElement>) => setCollectionName(e.target.value)} placeholder={user.firstname + 's Collection'} />
                    </Panel>

                    <Button onClick={handleClick}>Next</Button>
                </Page>
            )
        }
    }, [user]);

    return view;
}

export default InitialCollection;