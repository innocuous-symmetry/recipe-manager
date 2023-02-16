import { useAuthContext } from "../../context/AuthContext";
import { LegacyRef, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { Button, Card, Divider, Form, Page, Panel } from "../ui"
import { IIngredient, IRecipe } from "../../schemas";
import API from "../../util/API";
import { createOptionFromText, useSelectorContext } from "../../context/SelectorContext";
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

    const initialIngredient = useRef(null);

    // clear out selector state on page load
    /* useEffect(() => {
        setData(new Array<IIngredient>());
        setSelected(new Array<string>());
        setOptions(new Array<OptionType>());
    }, []) */

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
        if (data.length) {
            /* const autocompleteInstance = (
                <Autocomplete
                    multiple
                    freeSolo
                    autoHighlight
                    fullWidth
                    filterSelectedOptions
                    className="ui-creatable-component" 
                    id="ingredient-autocomplete"
                    options={options.map(each => each.label)}
                    onChange={(e) => updateSelection(e.target['innerText' as keyof EventTarget].toString())}
                    onKeyDown={(e) => {
                        if (e.code == 'Enter') {
                            const inputVal: string = e.target['value' as keyof EventTarget].toString();
                            console.log(inputVal)
                            if (inputVal.length) {
                                setSelected(prev => [...prev, inputVal])
                                const newOption = createOptionFromText(inputVal, optionCount + 1);
                                setOptions((prev) => [...prev, newOption]);
                                setOptionCount(prev => prev + 1);
                            }
                        }
                    }}
                    renderTags={(value, getTagProps) => value.map((option, idx) => <Chip variant="outlined" label={option} { ...getTagProps({ index: idx }) } onDelete={() => handleDelete(option)} />)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            placeholder="Ingredient Name"
                        />
                    )}
                />
            ) */

            // create dropdown from new data
            /*
            const selectorInstance = <Creatable 
                className="ui-creatable-component" 
                id="ingredient-selector" 
                isMulti 
                value={selected} 
                options={options} 
                onChange={(selection: MultiValue<OptionType>) => onChange(selection)}
                onCreateOption={(input: string) => onCreateOption(input, () => {})}
            /> 
            */

            // data.length && setSelector(autocompleteInstance);
            setTriggerChange(true);
        }
    }, [data, options])

    // once the dropdown data has populated, mount it within the full form
    /* useEffect(() => {
        triggerChange && setForm(
            <Form<IRecipe> _config={{
                parent: "AddRecipe",
                keys: ["name", "preptime", "course", "cuisine", "ingredients", "description"],
                labels: ["Recipe Name:", "Prep Time:", "Course:", "Cuisine:", "Ingredients:", "Description:"],
                dataTypes: ['text', 'text', 'custom picker', 'custom picker', 'SELECTOR', 'TINYMCE'],
                initialState: input,
                getState: getFormState,
                richTextInitialValue: "<p>Enter recipe details here!</p>",
            }} />
        )
    }, [triggerChange]) */

    useEffect(() => {
        console.log(options);
    }, [options])

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

    // store input data from form
    /*
    const getFormState = useCallback((data: IRecipe) => {
        setInput(data);
    }, [input])

    const updateSelection = (target: string) => {
        setSelected((prev) => {
            return [...prev, target];
        })
    }

    const handleDelete = (target: string) => {
        setSelected((prev) => {
            return prev.filter(option => option !== target);
        })
    } */

    useEffect(() => {
        return;
    }, [ingredientFields])

    // submit handler
    const handleCreate = async () => {
        if (!token) return;

        for (let field of Object.keys(input)) {
            if (!input[field as keyof IRecipe]) {
                console.log(field);
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

    useEffect(() => {
        console.log(optionCount);
    }, [optionCount])
    
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