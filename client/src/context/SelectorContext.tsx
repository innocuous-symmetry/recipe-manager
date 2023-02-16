import { createContext, Dispatch, SetStateAction, useContext } from "react"
import { OptionType } from "../util/types"

interface SelectorContextProps<T> {
    data: Array<T>
    setData: Dispatch<SetStateAction<Array<T>>> | VoidFunction
    selected: Array<OptionType>
    setSelected: Dispatch<SetStateAction<Array<OptionType>>> | VoidFunction
    options: Array<OptionType>
    setOptions: Dispatch<SetStateAction<Array<OptionType>>> | VoidFunction
    selector: JSX.Element
    setSelector: Dispatch<SetStateAction<JSX.Element>> | VoidFunction
    onChange: (...params: any) => void
    onCreateOption: (label: string, generateObject: (label: string, id: number) => T) => void
}

const defaultValue: SelectorContextProps<any> = {
    data: new Array<any>(),
    setData: () => {},
    selected: new Array<any>(),
    setSelected: () => {},
    options: new Array<OptionType>(),
    setOptions: () => {},
    selector: <></>,
    setSelector: () => {},
    onChange: () => {},
    onCreateOption: (label: string) => {},
}

export function createOptionFromText(label: string, value?: number): OptionType {
    return {
        value: value || 0,
        label: label,
    }
}

export const SelectorContext = createContext<SelectorContextProps<any>>(defaultValue);
export const useSelectorContext = () => useContext(SelectorContext);