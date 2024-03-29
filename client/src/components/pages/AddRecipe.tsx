// library/framework
import { useCallback, useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { v4 } from "uuid";

// util/api
import { useAuthContext } from "../../context/AuthContext";
import { DropdownData, IIngredient, IRecipe, RecipeIngredient } from "../../schemas";
import { IngredientFieldData } from "../../util/types";
import Protect from "../../util/Protect";
import API from "../../util/API";

// ui/components
import { Button, Card, Divider, Panel, RichText, Toast } from "../ui"
import IngredientSelector from "../derived/IngredientSelector";

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

            if (courseList && !courseData.length) {
                setCourseData((prev) => {
                    let newEntries = filterDuplicateEntries(courseList, prev);
                    return [...prev, ...newEntries];
                });
            }
        })();
    }, [token])

    // mount the ingredient selection section once conditions met:
    // 1. ingredients have been fetched
    // 2. measurements have been fetched
    // 3. ingredient fields have not already been initialized
    useEffect(() => {
        const conditionsMet = (ingredients.length && measurements.length) && (!ingredientFields.length);

        if (conditionsMet) {
            setIngredientFields([<IngredientSelector key={v4()} position={optionCount} ingredients={ingredients} units={measurements} getRowState={getRowState} destroy={destroySelector} />]);
        }
    }, [ingredients, measurements])

    /**********************************
     * PAGE SPECIFIC FUNCTIONS
     *********************************/
    // submit handler
    async function handleCreate() {
        if (!user || !token) return;

        let recipeID;
        let recipeName;

        // initialize API handlers
        const recipeAPI = new API.Recipe(token);
        const ingredientAPI = new API.Ingredient(token);

        // array to aggregate error/success messages
        let messages = new Array<string>();

        // inject current user id into recipe entry
        setInput({ ...input, authoruserid: user.id! });
        
        // verify all required fields are set
        for (let field of Object.keys(input)) {
            // account for an edge case where this state may not have been set yet
            if (field == 'authoruserid' as keyof IRecipe) {
                continue;
            }

            if (!input[field as keyof IRecipe]) {
                messages.push("Missing required field " + field);
                return;
            }
        }

        // post recipe entry
        const result = await recipeAPI.post(input);

        if (result) {
            recipeID = result.recipe.id;
            recipeName = result.recipe.name;
        }

        let preparedIngredientData = new Array<RecipeIngredient>();
        let newIngredientCount = 0;

        // check ingredient row for null values; normalize each row's data and insert into array above
        for (let row of ingredientFieldData) {
            if (!row) continue;
            console.log(row);

            if (row.ingredientSelection === undefined) {
                messages.push("Please ensure you have included ingredient selections for all rows.");
                continue;
            }

            if (!row.quantity) {
                messages.push("Please provide a quantity for ingredient " + row.ingredientSelection);
                continue;
            }

            if (!row.measurement) {
                messages.push(row.ingredientSelection + " missing required unit of measurement");
                continue;
            }

            /**
             * TO DO:
             * 
             * this inner row isn't working correctly just yet
             * once the inputs for each row have been validated:
             * 
             * 1. create new ingredient entries for new ingredients
             * 2. create ingredient recipe links for all recipes
             */
            
            for (let ing of row.ingredients) {
                // filter out recipes that already exist
                if (!ingredients.filter(x => x.name == ing.name).includes(ing)) {
                    console.log(ing.name);

                    // post the new ingredient to the database
                    const newEntry = await ingredientAPI.post(ing);
                    const newID = newEntry.id;

                    const newIngredientData: RecipeIngredient = {
                        ingredientid: newID,
                        recipeid: recipeID ?? null,
                        name: row.ingredientSelection as string,
                        quantity: row.quantity,
                        unit: row.measurement
                    }

                    preparedIngredientData.push(newIngredientData);

                    messages.push(`Successfully created new ingredient: ${ing.name}!`);
                    console.log(newEntry);
                    newIngredientCount++;
                } else {
                    const newIngredientData: RecipeIngredient = {
                        ingredientid: (ingredients.filter(x => x.name == ing.name)[0].id as number),
                        recipeid: recipeID ?? null,
                        name: row.ingredientSelection as string,
                        quantity: row.quantity,
                        unit: row.measurement
                    }

                    preparedIngredientData.push(newIngredientData);
                }

                // update the ingredient list
                setIngredients((prev) => [...prev, ing]);
            }
        }

        // handle recipe post resolve/reject
        if (result) {
            let recipeIngredientCount = 0;

            for (let ing of preparedIngredientData) {
                const ok = await recipeAPI.addIngredientToRecipe(ing, recipeID);
                if (ok) recipeIngredientCount++;
            }

            messages.push(`Created recipe ${recipeName} with ${recipeIngredientCount} total ingredients!`)
            if (newIngredientCount > 0) {
                messages.push(`Successfully created ${newIngredientCount} new ingredients! Thanks for helping us grow.`);
            }
            
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
