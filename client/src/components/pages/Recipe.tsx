import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Page, Panel } from "../ui";

interface IRecipe {
    id: number
    name: string
    description: string
    preptime: string
    datecreated?: string
    dateupdated?: string
}

export default function Recipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<IRecipe>();

    const getRecipeByID = async () => {
        const result = await fetch('http://localhost:8080/recipe/' + id)
        .then(response => response.json())
        .then(data => setRecipe(data));
    }

    useEffect(() => {
        getRecipeByID();
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