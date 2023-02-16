import { useCallback, useRef, useEffect, useState, createRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Button, Card, Divider, Form, Page, Panel } from "../ui"
import { IIngredient, IRecipe } from "../../schemas";
import API from "../../util/API";
import Creatable from "react-select/creatable";
import { OptionType } from "../../util/types";
import { createOptionFromText, useSelectorContext } from "../../context/SelectorContext";
import { MultiValue } from "react-select";
import { Autocomplete, Chip, TextField } from "@mui/material";

const AddRecipe = () => {
    const { user, token } = useAuthContext();
    const {
        data, setData, selector, setSelector,
        options, setOptions, selected, setSelected, 
        onChange, onCreateOption
    } = useSelectorContext();

    const [triggerChange, setTriggerChange] = useState(false);
    const [optionCount, setOptionCount] = useState(0);
    const [form, setForm] = useState<JSX.Element>();
    const [toast, setToast] = useState(<></>)
    const [input, setInput] = useState<IRecipe>({ name: '', preptime: '', description: '', authoruserid: '' })

    // clear out selector state on page load
    useEffect(() => {
        setData(new Array<IIngredient>());
        setSelected(new Array<string>());
        setOptions(new Array<OptionType>());
    }, [])

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

                setOptionCount(result.length);
            }
        })();
    }, [token])

    useEffect(() => {
        console.log(selected);
    }, [selected])

    useEffect(() => {
        if (data.length) {
            const autocompleteInstance = (
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
            )

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

            data.length && setSelector(autocompleteInstance);
            setTriggerChange(true);
        }
    }, [data, options, selected])

    // once the dropdown data has populated, mount it within the full form
    useEffect(() => {
        triggerChange && setForm(
            <Form<IRecipe> _config={{
                parent: "AddRecipe",
                keys: ["name", "preptime", "course", "cuisine", "ingredients", "description"],
                labels: ["Recipe Name:", "Prep Time:", "Course:", "Cuisine:", "Ingredients:", "Description:"],
                dataTypes: ['text', 'text', 'custom picker', 'custom picker', 'SELECTOR', 'TINYMCE'],
                initialState: input,
                getState: getFormState,
                richTextInitialValue: "<p>Enter recipe details here!</p>",
                selectorInstance: selector
            }} />
        )
    }, [triggerChange])

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
    }

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
    
    return (
        <Page>
            <h1>Add a New Recipe</h1>
            <Divider />

            <Panel extraStyles="width-80">
                { form }
                <Button onClick={handleCreate}>Create Recipe!</Button>

                <div id="toast">{ toast }</div>
            </Panel>
        </Page>
    )
}

export default AddRecipe;