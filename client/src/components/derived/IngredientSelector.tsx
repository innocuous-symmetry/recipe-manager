import { Autocomplete, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { DropdownData, IIngredient, RecipeIngredient } from "../../schemas";
import { IngredientFieldData } from "../../util/types";
import { Button } from "../ui";

interface IngredientSelectorProps {
    position: number
    ingredients: IIngredient[]
    units: DropdownData[]
    getRowState: (input: IngredientFieldData) => void
    destroy: (position: number) => void
}

const createIngredient = (name: string, userid: string | number) => {
    return {
        name: name,
        createdbyid: userid
    }
}

const quantityOptions: readonly any[] = [
    { name: "1/8"   , value: 0.125 },
    { name: "1/4"   , value: 0.250 },
    { name: "1/3"   , value: 0.333 },
    { name: "3/8"   , value: 0.375 },
    { name: "1/2"   , value: 0.500 },
    { name: "5/8"   , value: 0.625 },
    { name: "2/3"   , value: 0.666 },
    { name: "3/4"   , value: 0.750 },
    { name: "7/8"   , value: 0.875 },
    { name: "1 1/4" , value: 1.250 },
    { name: "1 1/3" , value: 1.333 },
    { name: "1 1/2" , value: 1.500 },
    { name: "1 2/3" , value: 1.666 },
    { name: "1 3/4" , value: 1.750 },
    { name: "2 1/4" , value: 2.250 },
    { name: "2 1/3" , value: 2.333 },
    { name: "2 1/2" , value: 2.500 },
    { name: "2 3/4" , value: 2.750 },
    { name: "3 1/4" , value: 3.250 },
    { name: "3 1/2" , value: 3.500 },
    { name: "3 3/4" , value: 3.750 },
    { name: "4 1/4" , value: 4.250 },
    { name: "4 1/2" , value: 4.500 },
    { name: "4 3/4" , value: 4.750 },
    { name: "5 1/4" , value: 5.250 },
    { name: "5 1/2" , value: 5.500 },
    { name: "5 3/4" , value: 5.750 },
]

function IngredientSelector({ position, ingredients, units, getRowState, destroy }: IngredientSelectorProps) {
    const { user } = useAuthContext();

    const [ingredientOptions, setIngredientOptions] = useState(ingredients.map(each => each.name));
    const [rowState, setRowState] = useState<IngredientFieldData>({
        quantity: undefined,
        rowPosition: position,
        measurement: undefined,
        ingredientSelection: undefined,
        ingredients: ingredients
    })

    const [quantityError, setQuantityError] = useState<null | string>(null);

    useEffect(() => {
        getRowState(rowState);
    }, [rowState, setRowState])

    function validateQuantity(input: any) {
        const value = new Number(input).valueOf();

        if (Number.isNaN(value)) {
            console.log('is nan');
            setQuantityError("Please provide a valid input (number)");
            return;
        }

        if (!input) {
            console.log('is null');
            setRowState({ ...rowState, quantity: undefined });
            setQuantityError(null);
            return;
        }

        setQuantityError(null);
        setRowState({ ...rowState, quantity: value });
    }

    return (
        <table className="ingredient-widget"><tbody>
            <tr>
                <td className="quantity-of-unit">
                    <Autocomplete
                        freeSolo
                        autoHighlight
                        options={quantityOptions.map(each => each.name)}
                        className="ui-creatable-component"
                        onChange={(event, value) => {
                            console.log(value);
                            validateQuantity(quantityOptions.filter(option => (option.name) == value)[0]['value'] as number);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                color={(rowState.quantity == null) ? (quantityError ? "error" : "info") : (quantityError ? "error" : "success")} 
                                label={quantityError ?? "Quantity"} 
                                onChange={(e) => validateQuantity(e.target.value)} 
                            />
                        )}
                    />
                </td>
                <td className="ingredient-unit">
                    <Autocomplete 
                        autoHighlight
                        options={units.map(each => each.name)}
                        className="ui-creatable-component"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Unit"
                            />
                        )}
                        onChange={(event, value) => {
                            if (value) {
                                setRowState({ ...rowState, measurement: value });
                            }
                        }}
                    />
                </td>
                <td className="ingredient-name">
                    <Autocomplete
                        autoHighlight
                        options={ingredientOptions}
                        freeSolo
                        className="ui-creatable-component"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Ingredient Name"
                            />
                        )}
                        onChange={(event, newValue) => {
                            if (!user) return;

                            if (typeof newValue == 'string') {
                                const newIngredient = createIngredient(newValue, user.id!);

                                setIngredientOptions((prev) => {
                                    let shouldInsert = true;
                                    for (let each of prev) {
                                        if (each == newValue) shouldInsert = false;
                                    }
                                    
                                    return (shouldInsert ? [...prev, newValue] : prev);
                                });

                                setRowState((prev) => {
                                    let shouldInsert = true;
                                    for (let each of prev.ingredients) {
                                        if (each.name == newValue) shouldInsert = false;
                                    }

                                    return {
                                        ...prev,
                                        ingredients: (shouldInsert ? [...prev.ingredients, newIngredient] : [...prev.ingredients]),
                                        ingredientSelection: newValue
                                    }
                                })
                            } else if (newValue == null) {
                                setRowState((prev) => {
                                    return {
                                        ...prev,
                                        ingredients: ingredients,
                                        ingredientSelection: undefined
                                    }
                                })
                            }
                        }}
                        
                    />
                </td>
                <td>
                    <Button onClick={() => destroy(position)}>Close</Button>
                </td>
            </tr>
        </tbody></table>
    )
}

export default IngredientSelector