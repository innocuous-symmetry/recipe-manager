import { useAuthContext } from "../../context/AuthContext";
import Protect from "../../util/Protect";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../util/API";
import { ICollection, IRecipe, IUser } from "../../schemas";
import { v4 } from "uuid";
import { Panel } from "../ui";

const Collection = () => {
    const [data, setData] = useState<ICollection>();
    const [owner, setOwner] = useState<IUser>();
    const [recipes, setRecipes] = useState<IRecipe[]>();
    const [content, setContent] = useState(<></>);
    const { user, token } = useAuthContext();
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        token && (async() => {
            const collections = new API.Collection(token);
            const users = new API.User(token);

            const result: ICollection = await collections.getByID(id);
            setData(result);

            const allRecipes = await collections.getRecipesFromOne(id);
            setRecipes(allRecipes);

            const actualUser = await users.getByID(result.ownerid as string);
            setOwner(actualUser);
        })();
    }, [token])

    useEffect(() => {
        if (user && data && recipes) {
            setContent(
                <>
                <div className="section-header">
                    <h1>COLLECTION: {data.name}</h1>
                    { <p>Collection by: {owner ? `${owner.firstname} ${owner.lastname}` : `${user.firstname} ${user.lastname}`}</p> }
                    <p>{recipes.length || 0} recipe{recipes.length != 1 && "s" }</p>
                    { data.ismaincollection && (
                        owner ? <p>(This is {owner.firstname}'s main collection)</p> : <p>(This is your main collection)</p>
                    )}

                    <Panel>
                        {
                            recipes && recipes.map((each: IRecipe) => 
                                <div className="recipe-card" key={v4()}>
                                    <h2>{each.name}</h2>
                                    { each.description && <div dangerouslySetInnerHTML={{ __html: each.description }}></div> }
                                </div>
                            )
                        }
                    </Panel>
                </div>
                </>
            )
        }
    }, [data, recipes])

    return (
        <Protect redirect={`/collections/${id}`}>
            { content }
        </Protect>
    )
}

export default Collection;