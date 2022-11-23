import { useContext } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import Protect from "../../../util/Protect";

export default function Subscriptions() {
    const { user } = useAuthContext();

    return (
        <Protect>
            <h1>{user?.firstname}'s Subscriptions</h1>
        </Protect>
    )
}