import { useAuthContext } from "../../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, Divider, Page, Panel } from "../ui"
import { DropdownData, IIngredient, IRecipe } from "../../schemas";
import IngredientSelector from "../derived/IngredientSelector";
import Protect from "../../util/Protect";
import API from "../../util/API";
import { v4 } from "uuid";
import RichText from "../ui/RichText";
import { Autocomplete, TextField } from "@mui/material";
import { IngredientFieldData } from "../../util/types";
import Toast from "../ui/Toast";

export default function AddRecipe() {
    /**********************************
     * STATE AND CONTEXT
     *********************************/
    const { user, token } = useAuthContext();

    // received recipe data
    const [input, setInput] = useState<IRecipe>({ name: '', preptime: '', description: '', authoruserid: '' })

    // UI state handling
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [measurements, setMeasurements] = useState<DropdownData[]>([]);
    const [courseData, setCourseData] = useState<DropdownData[]>([]);
    const [ingredientFields, setIngredientFields] = useState<Array<JSX.Element>>([]);
    const [ingredientFieldData, setIngredientFieldData] = useState<Array<IngredientFieldData>>([]);
    const [optionCount, setOptionCount] = useState(0);

    // status reporting
    const [toast, setToast] = useState(<></>)

    /**********************************
     * CALLBACKS FOR CHILD COMPONENTS
     *********************************/
    // callback to retrieve state from ingredient rows
    const getRowState = useCallback((value: IngredientFieldData) => {
        setIngredientFieldData((prev) => {
            const newState = prev;
            newState[value.rowPosition] = value;
            return newState;
        });
    }, [ingredientFieldData])

    // callback passed to each ingredient row to enable the row to be closed
    const destroySelector = useCallback((position: number) => {
        setIngredientFieldData((prev) => {
            return [...prev.filter(each => each.rowPosition !== position)];
        })

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

    /**********************************
     * PAGE MOUNT BEHAVIOR AND SIDE EFFECTS
     *********************************/
    // store all ingredients on page mount
    useEffect(() => {
        token && (async() => {
            const ingredients = new API.Ingredient(token);
            const _dropdowns = new API.Dropdowns(token);
            const ingredientList = await ingredients.getAll();
            const measurementList = await _dropdowns.getAllMeasurements();
            const courseList = await _dropdowns.getAllCourses();

            function filterDuplicateEntries(receivedList: any[], previousState: any) {
                let newEntries = [];
                for (let each of receivedList) {
                    if (previousState.includes(each)) {
                        continue;
                    }

                    newEntries.push(each);
                }

                return newEntries;
            }

            if (ingredientList) {
                setIngredients((prev) => {
                    let newEntries = filterDuplicateEntries(ingredientList, prev);
                    return [...prev, ...newEntries];
                });
            }

            if (measurementList) {
                setMeasurements((prev) => {
                    let newEntries = filterDuplicateEntries(measurementList, prev);
                    return [...prev, ...newEntries];
                });
            }

            if (courseList) {
                setCourseData((prev) => {
                    let newEntries = filterDuplicateEntries(courseList, prev);
                    return [...prev, ...newEntries];
                });
            }
        })();
    }, [token])

    // mount the ingredient selection section once dependencies have loaded
    useEffect(() => {
        if (ingredients.length && measurements.length) {
            setIngredientFields([<IngredientSelector key={v4()} position={optionCount} ingredients={ingredients} units={measurements} getRowState={getRowState} destroy={destroySelector} />]);
        }
    }, [ingredients, measurements])

    useEffect(() => {
        console.log(ingredientFieldData);
    }, [getRowState]);

    /**********************************
     * PAGE SPECIFIC FUNCTIONS
     *********************************/
    // submit handler
    const handleCreate = async () => {
        if (!user || !token) return;

        // inject current user id into recipe entry
        setInput({ ...input, authoruserid: user.id! });
        
        for (let field of Object.keys(input)) {
            // account for an edge case where this state may not have been set yet
            if (field == 'authoruserid' as keyof IRecipe) {
                continue;
            }

            if (!input[field as keyof IRecipe]) {
                return;
            }
        }

        const recipe = new API.Recipe(token);
        const result = await recipe.post(input);

        if (result) {
            const recipeID = result.recipe.id;
            const recipeName = result.recipe.name;
            
            setToast(
                <Toast>
                    <p>Created recipe {recipeName} successfully!</p>
                    <p>View your new recipe <a href={`/recipe/${recipeID}`}>here!</a></p>
                </Toast>
            )
        } else {
            setToast(
                <Toast variant="fail">
                    <p>Error creating your recipe</p>
                    <p>Please refresh the browser window and try again.</p>
                </Toast>
            )
        }
    }

    // logic for inserting a new ingredient row
    function handleNewOption() {
        setIngredientFields((prev) => [...prev, <IngredientSelector position={optionCount + 1} key={v4()} ingredients={ingredients} units={measurements} getRowState={getRowState} destroy={destroySelector} />])
        setOptionCount(prev => prev + 1);
    }
    
    /**********************************
     * RENDER
     *********************************/
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
                <Button onClick={() => console.log(ingredientFieldData)}>Ingredient Field Data</Button>
                
                { ingredients && (
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
