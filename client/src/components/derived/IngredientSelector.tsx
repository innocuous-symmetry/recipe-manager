import { Autocomplete, TextField } from "@mui/material"
import { useRef, useState } from "react";
import { IIngredient } from "../../schemas";
import { Button } from "../ui";

interface IngredientSelectorProps {
    position: number
    ingredients: IIngredient[]
    destroy: (position: number) => void
}

function IngredientSelector({ position, ingredients, destroy }: IngredientSelectorProps) {
    const [options, setOptions] = useState(ingredients.map(each => each.name));
    const [newOptions, setNewOptions] = useState(new Array<string>());
    const [selected, setSelected] = useState(new Array<string>());

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Autocomplete
                autoHighlight
                options={options}
                className="ui-creatable-component"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        placeholder="Ingredient Name"
                    />
                )}
                onKeyDown={(e) => {
                    if (e.code == 'Enter') {
                        const inputVal: string = e.target['value' as keyof EventTarget].toString();
                        console.log(inputVal)
                        if (inputVal.length) {
                            setSelected(prev => [...prev, inputVal])
                            setOptions((prev) => [...prev, inputVal]);
                        }
                    }
                }}
            />
            {/* @ts-ignore */}
            <Button onClick={() => destroy(position)}>Close</Button>
        </div>
    )
}

export default IngredientSelector