import { Autocomplete, TextField } from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { DropdownData, IIngredient } from "../../schemas";
import { Button } from "../ui";

interface IngredientSelectorProps {
    position: number
    ingredients: IIngredient[]
    units: DropdownData[]
    destroy: (position: number) => void
}

interface RowState {
    quantity: number
    measurement: string | null
    ingredientSelection: string | null
    ingredients: IIngredient[]
}

const createIngredient = (name: string, userid: string | number) => {
    return {
        name: name,
        createdbyid: userid
    } as IIngredient
}

function IngredientSelector({ position, ingredients, units, destroy }: IngredientSelectorProps) {
    const { user } = useAuthContext();

    const [ingredientOptions, setIngredientOptions] = useState(ingredients.map(each => each.name));
    const [measurementUnits, setMeasurementUnits] = useState(units.map(each => each.name));

    const [rowState, setRowState] = useState<RowState>({
        quantity: 0,
        measurement: null,
        ingredientSelection: null,
        ingredients: ingredients
    })

    useEffect(() => {
        console.log("Row " + position + " state changed:");
        console.log(rowState);
    }, [rowState])

    return (
        <table className="ingredient-widget"><tbody>
            <tr>
                <td className="quantity-of-unit">
                    <TextField variant="outlined" label="Quantity" onChange={(e) => setRowState({...rowState, quantity: parseFloat(e.target.value) })} />
                </td>
                <td className="ingredient-unit">
                    <Autocomplete 
                        autoHighlight
                        options={measurementUnits}
                        className="ui-creatable-component"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Unit"
                            />
                        )}
                        onChange={(event, value) => {
                            setRowState({ ...rowState, measurement: value });
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
                                setIngredientOptions((prev) => [...prev, newValue]);

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
                                        ingredientSelection: null
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