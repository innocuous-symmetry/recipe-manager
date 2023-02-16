import { useState } from "react";
import { OptionType } from "../util/types";
import { SelectorContext } from "./SelectorContext";

function SelectorProvider<T>({ children }: { children: JSX.Element | JSX.Element[] }) {
    const [data, setData] = useState<Array<T>>([]);
    const [selector, setSelector] = useState<JSX.Element>(<></>)
    const [options, setOptions] = useState<Array<OptionType>>([]);
    const [selected, setSelected] = useState<Array<string>>([]);

    /**
     * Event handler for a change in selection state
     */
    const onChange = (data: Array<any>) => {
        setSelected((prev) => [...prev, ...data]);
    }

    const onCreateOption = (label: string, generateObject: (label: string, id: number) => T) => {
        const newID = options.length + 1;
        const newOption: OptionType = { label: label, value: newID }

        setOptions((prev) => [...prev, newOption]);
        setSelected((prev) => [...prev, newOption.label]);
        setData((prev) => [...prev, generateObject(label, newID)]);
    }

    const providerValue = {
        data, setData, selector, setSelector,
        options, setOptions, selected, setSelected, 
        onChange, onCreateOption
    }

    return (
        <SelectorContext.Provider value={ providerValue }>
            { children }
        </SelectorContext.Provider>
    )
}

export default SelectorProvider;