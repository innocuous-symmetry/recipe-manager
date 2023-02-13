import { useEffect, useState } from "react";
import { RegisterVariantType, VariantLabel } from ".";
import { useNow } from "../../../hooks/useNow";
import { ICollection } from "../../../schemas";
import API from "../../../util/API";
import { Button, Divider, Page, Panel } from "../../ui";
import { useAuthContext } from "../../../context/AuthContext";

const InitialCollection: RegisterVariantType = ({ transitionDisplay, input }) => {
    const { user, token } = useAuthContext();
    const [collectionName, setCollectionName] = useState<string>();
    const [view, setView] = useState<JSX.Element>(<Page><h1>Loading...</h1></Page>);
    const now = useNow();

    const handleClick = async () => {
        if (!user || !token) return;

        const collectionAPI = new API.Collection(token);

        const collection: ICollection = {
            name: collectionName ?? (user.firstname + "'s Collection"),
            active: true,
            ismaincollection: true,
            ownerid: user.id!.toString(),
            datecreated: now,
            datemodified: now
        }

        const result = await collectionAPI.post(collection);
        if (result) transitionDisplay(VariantLabel.AddFriends);
    }

    useEffect(() => {    
        if (user && token) {
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

                        {/* <TextField onChange={(e: ChangeEvent<HTMLInputElement>) => setCollectionName(e.target.value)} placeholder={user.firstname + 's Collection'} /> */}
                        <input type="text" onChange={(e) => setCollectionName(e.target.value)} placeholder={user.firstname + '\'s Collection'}></input>
                    </Panel>

                    <Button onClick={handleClick}>Next</Button>
                </Page>
            )
        }
    }, [user]);

    return view;
}

export default InitialCollection;