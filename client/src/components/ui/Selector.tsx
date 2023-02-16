import { FormConfig } from "./Form"

interface OptionType {
    value: number
    label: string
}

interface SelectorProps<T> {
    config: FormConfig<T>
    idx: number
    update: (e: any, idx: number) => void
    optionList: Array<OptionType>
    loader?: Array<T>
}

function Selector<T>({ config, idx, update, optionList }: SelectorProps<T>) {
    return (
        <>
        </>
    )
}

export default Selector