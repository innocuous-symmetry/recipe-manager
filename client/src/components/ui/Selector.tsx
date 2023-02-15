interface Entity {
    id: string | number
    name?: string
}

function Selector<T extends Entity>({ optionList }: { optionList: Array<T> }) {
// const Selector: FC<{ optionList: Array<T extends HasID> }> = ({ optionList }) => {
    return (
        <select className="ui-select-component">
            { optionList.map(item => 
                <option id={`select-item-${item.name}-${item.id}`}>{item.name}</option>
            )}
        </select>
    )
}

export default Selector