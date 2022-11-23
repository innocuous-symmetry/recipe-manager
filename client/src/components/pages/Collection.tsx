import { useAuthContext } from "../../context/AuthContext";
import Protect from "../../util/Protect";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Collection = () => {
    const [isDefault, setIsDefault] = useState(true);
    const { user } = useAuthContext();
    const { id } = useParams();

    if (id) {
        setIsDefault(false);
    }

    return (
        <Protect>
            { isDefault ?

            <>
            <h1>Mikayla's collection</h1>
            <p>37 recipes</p>
            <p>71 ingredients</p>
            <p>11 types of cuisine</p>
            </>

            :

            <>

            </>

            }
            

            {/* recipes */}
        </Protect>
    )
}

export default Collection;