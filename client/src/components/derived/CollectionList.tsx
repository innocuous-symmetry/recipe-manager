import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext"
import API from "../../util/API";
import { Card } from "../ui"

function CollectionList() {
    const { user, token } = useAuthContext();

    useEffect(() => {
        if (user && token) {
            (async() => {
                const Collections = new API.Collection(token);
                const result = await Collections.getAllAuthored();
                console.log(result);
            })();
        }
    }, [user])

    return (
        <Card>

        </Card>
    )

}

export default CollectionList