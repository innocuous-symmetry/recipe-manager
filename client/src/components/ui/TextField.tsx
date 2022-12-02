import { FC } from "react"
import { v4 } from 'uuid';

interface TextFieldParams {
    onChange: (...params: any) => any
    id?: string | number
    label?: string
    placeholder?: string
}

const TextField: FC<any> = ({ onChange, label, id, placeholder }) => {
    return (
        <>
        { label && <label htmlFor={''}>{label}</label>}
        <input onChange={onChange} type="text" id={id || v4()} placeholder={placeholder || ''} />
        </>
    )
}

export default TextField;