import { ChangeEvent, FC, useEffect, useState } from "react"
import ReactQuill from "react-quill"

interface QuillParams {
    id: string
    onChange: (params?: any) => any
    theme?: string
}

const Quill: FC<QuillParams> = ({ id, onChange, theme = 'snow' }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        onChange(value);
    }, [value])

    return (
        <ReactQuill id={id} theme={theme} value={value} onChange={setValue} />
    )
}

export default Quill;