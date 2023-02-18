import { useAuthContext } from "../../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Divider, Page, Panel } from "../ui"
import { DropdownData, IIngredient, IRecipe } from "../../schemas";
import { useSelectorContext } from "../../context/SelectorContext";
import IngredientSelector from "../derived/IngredientSelector";
import Protect from "../../util/Protect";
import API from "../../util/API";
import { v4 } from "uuid";
import RichText from "../ui/RichText";
import { TextareaAutosize, TextField } from "@mui/material";
// import "/src/sass/pages/AddRecipe.scss";

const AddRecipe = () => {
    const { user, token } = useAuthContext();
    const { data, setData } = useSelectorContext();

    const [input, setInput] = useState<IRecipe>({ name: '', preptime: '', description: '', authoruserid: '' })
    const [measurements, setMeasurements] = useState<DropdownData[]>([]);
    const [ingredientFields, setIngredientFields] = useState<Array<JSX.Element>>([]);
    const [optionCount, setOptionCount] = useState(0);
    const [toast, setToast] = useState(<></>)

    // store all ingredients on page mount
    useEffect(() => {
        token && (async() => {
            const ingredients = new API.Ingredient(token);
            const _measurements = new API.Measurements(token);
            const result = await ingredients.getAll();
            const measurementList = await _measurements.getAll();

            if (result) {
                setData((prev) => [...prev, ...result]);
            }

            if (measurementList) {
                setMeasurements((prev) => [...prev, ...measurementList]);
            }
        })();
    }, [token])

    useEffect(() => {
        if (data.length && measurements.length) {
            setIngredientFields([<IngredientSelector key={v4()} position={optionCount} ingredients={data} units={measurements} destroy={destroySelector} />]);
        }

    }, [data, measurements])

    // once user information is available, store it in recipe data
    useEffect(() => {
        user && setInput((prev: IRecipe) => {
            return {
                ...prev,
                authoruserid: user.id!
            }
        })
    }, [user])

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
        setIngredientFields((prev) => [...prev, <IngredientSelector position={optionCount + 1} key={v4()} ingredients={data} units={measurements} destroy={destroySelector} />])
        setOptionCount(prev => prev + 1);
    }

    useEffect(() => {
        console.log(input);
    }, [input])
    
    return (
        <Protect redirect="/add-recipe">
            <h1>Add a New Recipe</h1>
            <Divider />

            <Panel id="create-recipe-panel" extraClasses="ui-form-component width-80">
                <div className="form-row">
                    <label>Recipe Name:</label>
                    <TextField variant="outlined" label="Recipe Name" onChange={(e) => setInput({ ...input, name: e.target.value })}/>
                </div>

                <div className="form-row">
                    <label>Prep Time:</label>
                    <TextField variant="outlined" label="Prep Time" onChange={(e) => setInput({ ...input, preptime: e.target.value })}/>
                </div>

                <div className="form-row">
                    <label>Course:</label>
                    <input placeholder="Replace me with dropdown!" />
                </div>
                
                { data && (
                    <>
                    <Card extraClasses="form-row flex-row ingredient-card">
                        <label id="ingredients-label">Ingredients:</label>
                        <div className="ingredient-container">
                            { ingredientFields }
                            <Button id="add-ingredient-button" onClick={handleNewOption}>Add Ingredient</Button>
                        </div>
                    </Card>
                    </>
                )}

                <Divider />

                <div className="form-row">
                    <label id="description-label">Description:</label>
                    <RichText id="add-ingredient-description" getState={(text) => setInput({ ...input, description: text })} />
                </div>

                <Button onClick={handleCreate}>Create Recipe!</Button>

                <div id="toast">{ toast }</div>
            </Panel>
        </Protect>
    )
}

export default AddRecipe;