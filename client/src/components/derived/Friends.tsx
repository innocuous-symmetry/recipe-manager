import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Panel } from "../ui";

export default function Friends() {
    const { user } = useAuthContext();

    useEffect(() => {
        
    })

    return (
        <Panel>

        </Panel>
    )
}