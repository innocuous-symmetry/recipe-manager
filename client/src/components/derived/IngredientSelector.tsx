import { Autocomplete, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { DropdownData, IIngredient } from "../../schemas";
import { Button } from "../ui";

interface IngredientSelectorProps {
    position: number
    ingredients: IIngredient[]
    units: DropdownData[]
    destroy: (position: number) => void
}

function IngredientSelector({ position, ingredients, units, destroy }: IngredientSelectorProps) {
    const [options, setOptions] = useState(ingredients.map(each => each.name));
    const [measurementUnits, setMeasurementUnits] = useState(units.map(each => each.name));
    const [newOptions, setNewOptions] = useState(new Array<string>());
    const [selected, setSelected] = useState(new Array<string>());

    return (
        <table className="ingredient-widget"><tbody>
            <tr>
                <td className="quantity-of-unit">
                    <TextField variant="outlined" label="Quantity" />
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
                        onKeyDown={(e) => {
                            console.log(e.code);
                            /* if (e.code == 'Enter') {
                                const inputVal: string = e.target['value' as keyof EventTarget].toString();
                                if (inputVal.length) {
                                    setSelected(prev => [...prev, inputVal])
                                    setOptions((prev) => [...prev, inputVal]);
                                }
                            } */
                        }}
                    />
                </td>
                <td className="ingredient-name">
                    <Autocomplete
                        autoHighlight
                        options={options}
                        className="ui-creatable-component"
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Ingredient Name"
                            />
                        )}
                        onKeyDown={(e) => {
                            if (e.code == 'Enter') {
                                const inputVal: string = e.target['value' as keyof EventTarget].toString();
                                if (inputVal.length) {
                                    setSelected(prev => [...prev, inputVal])
                                    setOptions((prev) => [...prev, inputVal]);
                                }
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