import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext"
import useDateFormat from "../../hooks/useDateFormat";
import { ICollection } from "../../schemas";
import API from "../../util/API";
import { Card } from "../ui"

type CollectionListType = FC<{ targetID?: number | string }>

const CollectionList: CollectionListType = ({ targetID = null }) => {
    const [collections, setCollections] = useState<ICollection[]>();
    const [author, setAuthor] = useState<string>();
    const { user, token } = useAuthContext();

    useEffect(() => {
        if (user && token) {
            if (targetID) {
                (async() => {
                    const Collections = new API.Collection(token);
                    const result = await Collections.getAllAuthored(targetID);
                    setCollections(result);
                })();
            } else {
                (async() => {
                    const Collections = new API.Collection(token);
                    const result = await Collections.getAllAuthored();
                    setCollections(result);
                })();
            }
        }
    }, [user])

    return (
        <Card>
            { collections && collections.map(each =>
                <div className="collection-item" key={v4()}>
                    <h2>{each.name}</h2>
                    { targetID && <p>Created by {author}</p>}
                    <p>Created {useDateFormat(each.datecreated)}</p>
                </div>
            )}
        </Card>
    )
}

export default CollectionList