import Protect from "../../util/Protect";
import { Button, Page } from "../ui";

export default function Browser() {
    return (
        <Protect>
            <h1>Search recipes</h1>
            <div>
                <input type="text"></input>
                <Button>ADVANCED SEARCH</Button>
            </div>

            {/* divider */}

            {/* recipe cards, or "no recipes matching your search" */}
        </Protect>
    )
}