import reactSelect from "react-select"
import makeAnimated from "react-select/animated";
import { FormConfig } from "./Form"
import { v4 } from "uuid"

interface Entity {
    id: string | number
    name?: string
}

function Selector<T extends Entity>({ config, idx, optionList }: { config: FormConfig<T>, idx: number, optionList: Array<T> }) {
// const Selector: FC<{ optionList: Array<T extends HasID> }> = ({ optionList }) => {
    return (
        <div className="form-row form-row-selector" id={`${config.parent}-row-${idx}`} key={v4()}>
            <label htmlFor={`${config.parent}-${config.keys[idx]}`}>{config.labels![idx]}</label>
            <select className="ui-select-component">
            { optionList.map(item => 
                <option id={`select-item-${item.name}-${item.id}`}>{item.name}</option>
            )}
            </select>
        </div>
    )
}

export default Selector