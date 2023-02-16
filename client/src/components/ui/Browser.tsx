import { FC, useEffect, useState } from "react";
import Protect from "../../util/Protect";
import Form from "./Form/Form";

interface BrowserProps {
    children?: JSX.Element[]
    header: string
    searchFunction: (...params: any) => any
}

const Browser: FC<BrowserProps> = ({ children, header, searchFunction }) => {
    const [form, setForm] = useState<any>();

    useEffect(() => {
        
    })

    return (
        <Protect>
            <h1>{header}</h1>
        </Protect>
    )
}

export default Browser;