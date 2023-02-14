import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";
import { ICollection, IRecipe } from "../../schemas";
import API from "../../util/API";
import { Card, Page } from "../ui";

interface CollectionDetails {
    idx: number
    collection: ICollection
    recipes: IRecipe[]
}

const CollectionBrowser = () => {
    const [list, setList] = useState<ICollection[]>();
    const { token } = useAuthContext();

    useEffect(() => {
        if (!token) return;
        (async() => {
            const collections = new API.Collection(token);
            const recipes = new API.Recipe(token);

            const allRecipes = await collections.getAllAuthored();
            if (allRecipes) {
                const result = new Array<CollectionDetails[]>();

                let i = 0;
                for (let each of allRecipes) {
                }
                
                setList(allRecipes);
            }
        })();
    }, [token])

    return (
        <Page>
            <h1>Browsing your {2} collections:</h1>

            {
                list && list.map(each => {
                    return (
                        <Card key={v4()}>
                            <h2>{each.name}</h2>
                            <a href={`/collections/${each.id}`}>Link to details</a>
                        </Card>
                    )
                })
            }
        </Page>
    )
}

export default CollectionBrowser;