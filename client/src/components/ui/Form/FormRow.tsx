import { useEffect, useState } from "react";
import { v4 } from "uuid";

interface FormRowConfig {
    parent: any
    labelText: string
    idx?: number
    dataType?: string
}

function FormRow({ parent, labelText, idx, dataType = "string" }) {
    const [row, setRow] = useState<JSX.Element>();

    useEffect(() => {
        switch (dataType) {
            case "TINYMCE":
                break;
            case "string":
            default:
                setRow(
                    <div className="form-row" id={`${parent}-row-${idx || v4()}`} key={v4()}>
                        <label htmlFor={`${parent}-${each}`}>{labelText}</label>
                        <input
                            type={dataType}
                            id={`${parent}-${each}`}
                            onChange={(e) => update(e, idx)}
                            value={state[i as keyof T] as string}>
                        </input>
                    </div>
                )
                break;
        }
    }, [])

    return (
        <></>
    )
}