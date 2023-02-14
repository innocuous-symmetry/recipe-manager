import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import { ICollection } from "../../schemas";
import API from "../../util/API";
import { Page, Panel } from "../ui";

const CollectionBrowser = () => {
    const [list, setList] = useState<ICollection[]>();
    const { token } = useAuthContext();

    async function getRecipeCount(collection: ICollection) {
        if (!token) return [];
        const collections = new API.Collection(token);
        const result = await collections.getRecipesFromOne(collection.id);
        if (result) return result;
        return [];
    }

    async function mapRecipes() {
        if (!list) return;

        return list.map(async (each) => {
            const count = await getRecipeCount(each);

            return (
                <Panel key={v4()}>
                    <h2>{each.name}</h2>
                    <p>{count.length} recipes</p>
                    <a href={`/collections/${each.id}`}>Link to details</a>
                </Panel>
            )
        })
    }

    useEffect(() => {
        if (!token) return;
        (async() => {
            const collections = new API.Collection(token);
            const allRecipes = await collections.getAllAuthored();
            if (allRecipes) setList(allRecipes);
        })();
    }, [token])

    useEffect(() => {

    }, [list])

    return (
        <Page>
            { list && (
                <>
                <h1>Browsing your {list.length} collection{ (list.length !== 1) && "s" }:</h1>
    
                { list.map(each => {
                    return (
                        <Panel key={v4()}>
                            <h2>{each.name}</h2>
                            <a href={`/collections/${each.id}`}>Link to details</a>
                        </Panel>
                    )
                })}
                </>
            )}
        </Page>
    )
}

export default CollectionBrowser;