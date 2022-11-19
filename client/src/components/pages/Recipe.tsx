import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Page, Panel } from "../ui";
import { IRecipe } from "../../util/types";
import { getRecipeByID } from "../../util/apiUtils";

export default function Recipe() {
    const [recipe, setRecipe] = useState<IRecipe>();
    const { id } = useParams();

    if (!id) {
        return (
            <Page>
                <h1>404 | Not Found</h1>
                <p>There's no content here! Technically, you shouldn't have even been able to get here.</p>
                <p>So, kudos, I guess!</p>
            </Page>
        )
    }

    useEffect(() => {
        getRecipeByID(id);
    }, [])

    return (
        <Page>
            { recipe && (
                <Panel>
                    <h1>{recipe.name}</h1>
                    <p>{recipe.description}</p>
                    <p>{recipe.preptime}</p>
                </Panel>
            )}
        </Page>
    )
}