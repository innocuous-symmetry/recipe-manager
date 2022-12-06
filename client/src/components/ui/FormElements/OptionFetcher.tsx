import { FC } from "react";
import { PortalBase } from "../../../util/types";

interface FetcherParams extends PortalBase {
    fetchTarget: string
}

const OptionFetcher: FC<FetcherParams> = ({ children, fetchTarget }) => {
    const fetchOptions = async () => {
        console.log(fetchTarget);
    }

    return (
        <div>
            { children }
        </div>
    )
}

export default OptionFetcher;