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
import { Autocomplete, TextField } from "@mui/material";

const AddRecipe = () => {
    const { user, token } = useAuthContext();
    const { data, setData } = useSelectorContext();

    // received recipe data
    const [input, setInput] = useState<IRecipe>({ name: '', preptime: '', description: '', authoruserid: '' })

    // UI state handling
    const [measurements, setMeasurements] = useState<DropdownData[]>([]);
    const [ingredientFields, setIngredientFields] = useState<Array<JSX.Element>>([]);
    const [courseData, setCourseData] = useState<DropdownData[]>([]);
    const [optionCount, setOptionCount] = useState(0);

    // status reporting
    const [toast, setToast] = useState(<></>)

    // store all ingredients on page mount
    useEffect(() => {
        token && (async() => {
            const ingredients = new API.Ingredient(token);
            const _dropdowns = new API.Dropdowns(token);
            const result = await ingredients.getAll();
            const measurementList = await _dropdowns.getAllMeasurements();
            const courseList = await _dropdowns.getAllCourses();

            if (result) {
                setData((prev) => [...prev, ...result]);
            }

            if (measurementList) {
                setMeasurements((prev) => [...prev, ...measurementList]);
            }

            if (courseList) {
                setCourseData((prev) => [...prev, ...courseList]);
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
        console.log(courseData);
    }, [courseData])
    
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
                    { courseData.length && 
                        <Autocomplete
                            autoHighlight
                            options={courseData}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Course" />
                            )}
                            getOptionLabel={(option) => option.name}
                    />}
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