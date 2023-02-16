import { useAuthContext } from "../../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Divider, Page, Panel } from "../ui"
import { IIngredient, IRecipe } from "../../schemas";
import API from "../../util/API";
import { useSelectorContext } from "../../context/SelectorContext";
import IngredientSelector from "../derived/IngredientSelector";
import { v4 } from "uuid";

const AddRecipe = () => {
    const { user, token } = useAuthContext();
    const { data, setData, options, setOptions } = useSelectorContext();
    const [ingredientFields, setIngredientFields] = useState<Array<JSX.Element>>([]);
    const [triggerChange, setTriggerChange] = useState(false);
    const [optionCount, setOptionCount] = useState(0);
    const [toast, setToast] = useState(<></>)
    const [input, setInput] = useState<IRecipe>({ name: '', preptime: '', description: '', authoruserid: '' })

    // store all ingredients on page mount
    useEffect(() => {
        token && (async() => {
            const ingredients = new API.Ingredient(token);
            const result = await ingredients.getAll();

            if (result) {
                setData((prev) => [...prev, ...result]);
    
                // once async data is received, derive its new states
                setOptions(result.map((each: IIngredient) => {
                    return { label: each.name, value: each.id }
                }));

                setIngredientFields([<IngredientSelector key={v4()} position={optionCount} ingredients={result} destroy={destroySelector} />]);
            }
        })();
    }, [token])

    useEffect(() => {
        if (data.length) setTriggerChange(true);
    }, [data, options])

    // once user information is available, store it in recipe data
    useEffect(() => {
        if (!user) return;
        user && setInput((prev: IRecipe) => {
            return {
                ...prev,
                authoruserid: user.id!
            }
        })
    }, [user])

    useEffect(() => {
        return;
    }, [ingredientFields])

    // submit handler
    const handleCreate = async () => {
        if (!token) return;

        for (let field of Object.keys(input)) {
            if (!input[field as keyof IRecipe]) {
                return;
            }
        }

        const recipe = new API.Recipe(token);
        const result = await recipe.post(input);

        const recipeID = result.recipe.id;
        const recipeName = result.recipe.name;
        
        setToast(
            <Card>
                <p>Created recipe {recipeName} successfully!</p>
                <p>View your new recipe <a href={`/recipe/${recipeID}`}>here!</a></p>
            </Card>
        )
    }

    const destroySelector = useCallback((position: number) => {
        setIngredientFields((prev) => {
            const newState = new Array<JSX.Element>();

            for (let i = 0; i < prev.length; i++) {
                if (i === position) {
                    continue;
                } else {
                    newState.push(prev[i]);
                }
            }

            return newState;
        })
    }, [ingredientFields]);

    function handleNewOption() {
        setIngredientFields((prev) => [...prev, <IngredientSelector position={optionCount + 1} key={v4()} ingredients={data} destroy={destroySelector} />])
        setOptionCount(prev => prev + 1);
    }
    
    return (
        <Page>
            <h1>Add a New Recipe</h1>
            <Divider />

            <Panel id="create-recipe-panel" extraClasses="ui-form-component width-80">
                <div className="form-row">
                    <label>Recipe Name:</label>
                    <input />
                </div>

                <div className="form-row">
                    <label>Prep Time:</label>
                    <input />
                </div>

                <div className="form-row">
                    <label>Course:</label>
                    <input />
                </div>
                
                { data && (
                    <Card extraClasses="form-row flex-row ingredient-card">
                        <label>Ingredients:</label>
                        <div id="ingredient-container">
                            { ingredientFields }
                            <Button onClick={handleNewOption}>Add Ingredient</Button>
                        </div>
                    </Card>
                )}

                <Divider />

                <div className="form-row">
                    <label>Description:</label>
                    { "description here" }
                </div>

                <Button onClick={handleCreate}>Create Recipe!</Button>

                <div id="toast">{ toast }</div>
            </Panel>
        </Page>
    )
}

export default AddRecipe;